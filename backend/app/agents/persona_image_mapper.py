import pandas as pd
import os
from typing import Optional
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
from app.core.config import GROQ_API_KEY
import supabase
import random
import re

# Path to the Excel mapping file
EXCEL_PATH = os.path.join(os.path.dirname(__file__), 'persona_image_mapping.xlsx')

# Load the Excel file once at module load
def load_mapping():
    if not os.path.exists(EXCEL_PATH):
        raise FileNotFoundError(f"Mapping file not found: {EXCEL_PATH}")
    return pd.read_excel(EXCEL_PATH)

mapping_df = load_mapping()
mapping_df['id'] = mapping_df['id'].astype(str)

# LLM setup (Groq)
llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="compound-beta-mini",
    temperature=0.2
)

# Prompt for LLM-based image mapping (return id)
prompt = ChatPromptTemplate.from_messages([
    ("system", """
You are an expert at matching personas to images. You are given:
- A persona JSON
- A list of candidate image rows, each with: id, location, gender, profession, age_group
Your job is to select the single best id for the persona, even if there is no perfect match. Always return a match.
Return ONLY the id of the best match, and nothing else. Do not explain your reasoning. Do not include any other text.
"""),
    ("human", """
Persona:
{persona_json}

Candidate image rows:
{candidates_json}

Which row is the closest match? Return only the id.
""")
])

SUPABASE_IMAGE_BASE_URL = "https://quqpyfigtzkgwgzccaex.supabase.co/storage/v1/object/public/persona-images/"

def find_best_image_for_persona(persona: dict) -> Optional[str]:
    print("[DEBUG] Entered find_best_image_for_persona")
    if mapping_df.empty:
        print("[DEBUG] mapping_df is empty")
        return None
    persona_json = str(persona)
    # Prepare minimal candidate data for LLM
    candidates = []
    for idx, row in mapping_df.iterrows():
        candidates.append({
            "id": row.get("id", idx),
            "location": row.get("location", ""),
            "gender": row.get("gender", ""),
            "profession": row.get("profession", ""),
            "age_group": row.get("age_group", "")
        })
    input_for_prompt = {
        "persona_json": persona_json,
        "candidates_json": str(candidates)
    }
    print("[DEBUG] About to call LLM for image mapping with minimal data (id-based)")
    chain = prompt | llm
    raw_output = chain.invoke(input_for_prompt)
    print("[DEBUG] LLM call completed")
    output_text = raw_output.content if hasattr(raw_output, "content") else str(raw_output)
    match = re.search(r'\b\d+\b', output_text)
    if not match:
        print(f"[LLM Image Mapping] Could not extract id from: {output_text}")
        return None
    id_str = match.group(0).strip()
    print(f"[LLM Image Mapping] Selected id: {id_str}")
    mapping_df['id'] = mapping_df['id'].astype(str)
    row = mapping_df[mapping_df['id'] == id_str]
    if row.empty:
        print(f"[LLM Image Mapping] No row found with id: {id_str}")
        print(f"All available ids: {list(mapping_df['id'])}")
        return None

    if 'image_path' not in row.columns:
        print(f"[LLM Image Mapping] 'image_path' column not found in DataFrame. Available columns: {list(row.columns)}")
        return None

    images_cell = row.iloc[0]['image_path']
    if pd.isna(images_cell) or not images_cell:
        print(f"[LLM Image Mapping] No images found in row with id {id_str}")
        return None
    image_paths = [img.strip() for img in str(images_cell).split(",") if img.strip()]
    if not image_paths:
        print(f"[LLM Image Mapping] No images found in row with id {id_str}")
        return None
    selected_image = random.choice(image_paths)
    selected_image_url = SUPABASE_IMAGE_BASE_URL + selected_image
    print(f"[LLM Image Mapping] Selected image_path: {selected_image_url}")
    return selected_image_url

def map_and_update_image(persona_id, persona_json):
    try:
        print(f"[DEBUG] Entered map_and_update_image for persona_id: {persona_id}")
        image_path = find_best_image_for_persona(persona_json)
        print(f"[DEBUG] find_best_image_for_persona returned: {image_path}")
        if image_path:
            supabase.table("personas").update({"profile_image_url": image_path}).eq("id", persona_id).execute()
            print(f"[Persona Update] persona_id: {persona_id}, updated profile_image_url: {image_path}")
    except Exception as e:
        print(f"[ERROR] Exception in map_and_update_image: {e}") 