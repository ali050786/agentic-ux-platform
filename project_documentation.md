# 📁 Folder Structure

├── .gitignore
├── backend/
│   ├── .gitignore
│   ├── app/
│   │   ├── agents/
│   │   │   ├── persona_agent.py
│   │   │   ├── persona_image_mapper.py
│   │   │   └── persona_image_mapping.xlsx
│   │   ├── api/
│   │   │   ├── deps.py
│   │   │   └── routes/
│   │   │       ├── define.py
│   │   │       ├── empathize.py
│   │   │       ├── export_persona.py
│   │   │       ├── orientation.py
│   │   │       └── upload.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   ├── __init__.py
│   │   │   ├── models/
│   │   │   │   └── persona.py
│   │   │   ├── persona_store.py
│   │   │   ├── schemas.py
│   │   │   └── supabase_client.py
│   │   ├── main.py
│   │   └── services/
│   │       ├── agent_runner.py
│   │       ├── document_generator.py
│   │       ├── file_processor.py
│   │       └── together_image.py
│   ├── conda_requirements.txt
│   ├── package.json
│   ├── persona_image_mapping.xlsx
│   ├── pyvenv.cfg
│   └── updated_persona_image_mapping.xlsx
├── dont/
├── figma plugin/
│   ├── code.js
│   ├── manifest.json
│   └── ui.html
├── frontend/
│   ├── .env.local
│   ├── .gitignore
│   ├── components.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── src/
│   │   ├── 13972.jpg
│   │   ├── 13972.png
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── components/
│   │   │   ├── HeaderBar.jsx
│   │   │   ├── WelcomeCard.jsx
│   │   │   ├── persona/
│   │   │   │   ├── ColorThemeSelector.jsx
│   │   │   │   ├── CustomPrompt.jsx
│   │   │   │   ├── FileUpload.jsx
│   │   │   │   ├── PersonaBuilder.jsx
│   │   │   │   ├── PersonaCard.jsx
│   │   │   │   ├── PersonaCardAgile.jsx
│   │   │   │   ├── PersonaCardClassic.jsx
│   │   │   │   ├── PersonaCardEmpathy.jsx
│   │   │   │   ├── PersonaCardJTBD.jsx
│   │   │   │   ├── PersonaDashboard.jsx
│   │   │   │   ├── PersonaForm.jsx
│   │   │   │   ├── PersonaPreview.jsx
│   │   │   │   ├── PersonaViewer.jsx
│   │   │   │   └── TagInput.jsx
│   │   │   └── ui/
│   │   │       ├── ProTip.jsx
│   │   │       ├── accordion.jsx
│   │   │       ├── alert-dialog.jsx
│   │   │       ├── badge.jsx
│   │   │       ├── button.jsx
│   │   │       ├── buttons.jsx
│   │   │       ├── card.jsx
│   │   │       ├── input.jsx
│   │   │       ├── select.jsx
│   │   │       ├── switch.jsx
│   │   │       └── textarea.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   ├── figmaExport.js
│   │   │   ├── generateClassicScenegraph.js
│   │   │   ├── supabase.js
│   │   │   └── utils.js
│   │   ├── logo.svg
│   │   ├── persona.jpg
│   │   ├── persona.pdf
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   │   └── styles/
│   │       └── globals.css
│   └── tailwind.config.js
├── orchestration/
│   ├── agents/
│   ├── memory/
│   ├── prompts/
│   └── workflows/
└── setup.sh

# 🧾 File Contents

## 📄 Code in `.gitignore`
```code
.env
```

## 📄 Code in `setup.sh`
```code
#!/bin/bash

echo "🔧 Setting up Agentic UX Platform..."

# Step 1: Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Step 2: Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Optional: Add react-scripts if missing
if ! npm list react-scripts >/dev/null 2>&1; then
  echo "⚠️ react-scripts not found. Installing manually..."
  npm install react-scripts
fi
cd ..

# Step 3: Confirm Supabase .env exists
if [ ! -f ".env" ]; then
  echo "⚠️ No .env file found at root. Create one for Supabase config."
else
  echo "✅ .env found"
fi

echo "✅ Setup complete. Ready to start development or testing!"
```

## 📄 Code in `backend\.gitignore`
```code
.env
Lib/
Include/
Scripts/
```

## 📄 Code in `backend\conda_requirements.txt`
```code
# This file may be used to create an environment using:
# $ conda create --name <env> --file <this file>
# platform: win-64
# created-by: conda 24.11.3
aiofiles=24.1.0=pyhd8ed1ab_1
aiohappyeyeballs=2.6.1=pypi_0
aiohttp=3.12.4=pypi_0
aiosignal=1.3.2=pypi_0
annotated-types=0.7.0=pyhd8ed1ab_1
anyio=4.9.0=pyh29332c3_0
attrs=25.3.0=pypi_0
bzip2=1.0.8=h2466b09_7
ca-certificates=2025.4.26=h4c7d964_0
cachecontrol=0.14.3=pypi_0
cachetools=5.5.2=pypi_0
certifi=2025.4.26=pyhd8ed1ab_0
cffi=1.17.1=pypi_0
charset-normalizer=3.4.2=pypi_0
click=8.1.8=pypi_0
colorama=0.4.6=pyhd8ed1ab_1
cryptography=45.0.3=pypi_0
dataclasses-json=0.6.7=pypi_0
deprecation=2.1.0=pypi_0
distro=1.9.0=pypi_0
dnspython=2.7.0=pyhff2d567_1
ecdsa=0.19.1=pypi_0
email-validator=2.2.0=pyhd8ed1ab_1
email_validator=2.2.0=hd8ed1ab_1
et-xmlfile=2.0.0=pypi_0
eval-type-backport=0.2.2=pypi_0
exceptiongroup=1.3.0=pyhd8ed1ab_0
fastapi=0.115.12=pyh29332c3_0
fastapi-cli=0.0.7=pyhd8ed1ab_0
filelock=3.18.0=pypi_0
firebase-admin=6.8.0=pypi_0
frozenlist=1.6.0=pypi_0
google-api-core=2.25.0rc1=pypi_0
google-api-python-client=2.170.0=pypi_0
google-auth=2.40.2=pypi_0
google-auth-httplib2=0.2.0=pypi_0
google-cloud-core=2.4.3=pypi_0
google-cloud-firestore=2.20.2=pypi_0
google-cloud-storage=3.1.0=pypi_0
google-crc32c=1.7.1=pypi_0
google-resumable-media=2.7.2=pypi_0
googleapis-common-protos=1.70.0=pypi_0
gotrue=2.12.0=pypi_0
greenlet=3.2.2=pypi_0
groq=0.26.0=pypi_0
grpcio=1.71.0=pypi_0
grpcio-status=1.71.0=pypi_0
h11=0.16.0=pyhd8ed1ab_0
h2=4.2.0=pyhd8ed1ab_0
hpack=4.1.0=pyhd8ed1ab_0
httpcore=1.0.9=pyh29332c3_0
httplib2=0.22.0=pypi_0
httptools=0.6.4=py311he736701_0
httpx=0.28.1=pyhd8ed1ab_0
httpx-sse=0.4.0=pypi_0
hyperframe=6.1.0=pyhd8ed1ab_0
idna=3.10=pyhd8ed1ab_1
iniconfig=2.1.0=pypi_0
jinja2=3.1.6=pyhd8ed1ab_0
jiter=0.10.0=pypi_0
jsonpatch=1.33=pypi_0
jsonpointer=3.0.0=pypi_0
langchain=0.3.25=pypi_0
langchain-community=0.3.24=pypi_0
langchain-core=0.3.63=pypi_0
langchain-groq=0.3.2=pypi_0
langchain-text-splitters=0.3.8=pypi_0
langsmith=0.3.43=pypi_0
libexpat=2.7.0=he0c23c2_0
libffi=3.4.6=h537db12_1
liblzma=5.8.1=h2466b09_1
libsqlite=3.50.0=h67fdade_0
libzlib=1.3.1=h2466b09_2
lxml=5.4.0=pypi_0
markdown-it-py=3.0.0=pyhd8ed1ab_1
markupsafe=3.0.2=py311h5082efb_1
marshmallow=3.26.1=pypi_0
mdurl=0.1.2=pyhd8ed1ab_1
msgpack=1.1.0=pypi_0
multidict=6.4.4=pypi_0
mypy-extensions=1.1.0=pypi_0
numpy=2.2.6=pypi_0
openai=1.82.1=pypi_0
openpyxl=3.1.5=pypi_0
openssl=3.5.0=ha4e3fda_1
orjson=3.10.18=pypi_0
packaging=24.2=pypi_0
pandas=2.3.0=pypi_0
pdfkit=1.0.0=pypi_0
pillow=11.2.1=pypi_0
pip=25.1.1=pyh8b19718_0
pluggy=1.6.0=pypi_0
postgrest=1.0.2=pypi_0
propcache=0.3.1=pypi_0
proto-plus=1.26.1=pypi_0
protobuf=5.29.5=pypi_0
psycopg=3.2.9=pypi_0
psycopg-binary=3.2.9=pypi_0
pyarrow=20.0.0=pypi_0
pyasn1=0.6.1=pypi_0
pyasn1-modules=0.4.2=pypi_0
pycparser=2.22=pypi_0
pydantic=2.11.4=pyh3cfb1c2_0
pydantic-core=2.33.2=py311hc4022dc_0
pydantic-settings=2.9.1=pypi_0
pygments=2.19.1=pyhd8ed1ab_0
pyjwt=2.10.1=pypi_0
pymupdf=1.26.0=pypi_0
pyparsing=3.2.3=pypi_0
pytest=8.3.5=pypi_0
pytest-mock=3.14.1=pypi_0
python=3.11.12=h3f84c4b_0_cpython
python-dateutil=2.9.0.post0=pypi_0
python-docx=1.1.2=pypi_0
python-dotenv=1.1.0=pyh29332c3_1
python-jose=3.5.0=pypi_0
python-magic=0.4.27=pypi_0
python-multipart=0.0.20=pyhff2d567_0
python_abi=3.11=7_cp311
pytz=2025.2=pypi_0
pyyaml=6.0.2=py311h5082efb_2
realtime=2.4.3=pypi_0
requests=2.32.3=pypi_0
requests-toolbelt=1.0.0=pypi_0
rich=14.0.0=pyh29332c3_0
rich-toolkit=0.11.3=pyh29332c3_0
rsa=4.9.1=pypi_0
setuptools=80.8.0=pyhff2d567_0
shellingham=1.5.4=pyhd8ed1ab_1
six=1.17.0=pypi_0
sniffio=1.3.1=pyhd8ed1ab_1
sqlalchemy=2.0.41=pypi_0
starlette=0.46.2=pyh81abbef_0
storage3=0.11.3=pypi_0
strenum=0.4.15=pypi_0
supabase=2.15.2=pypi_0
supafunc=0.9.4=pypi_0
tabulate=0.9.0=pypi_0
tenacity=9.1.2=pypi_0
tk=8.6.13=h2c6b04d_2
together=1.5.8=pypi_0
tqdm=4.67.1=pypi_0
typer=0.15.4=pypi_0
typer-slim=0.16.0=pyhe01879c_0
typer-slim-standard=0.16.0=hf964461_0
typing-extensions=4.13.2=h0e9735f_0
typing-inspect=0.9.0=pypi_0
typing-inspection=0.4.1=pyhd8ed1ab_0
typing_extensions=4.13.2=pyh29332c3_0
tzdata=2025.2=pypi_0
ucrt=10.0.22621.0=h57928b3_1
uritemplate=4.1.1=pypi_0
urllib3=2.4.0=pypi_0
uvicorn=0.34.2=pyh5737063_0
uvicorn-standard=0.34.2=h5737063_0
vc=14.3=h2b53caa_26
vc14_runtime=14.42.34438=hfd919c2_26
vs2015_runtime=14.42.34438=h7142326_26
watchfiles=1.0.5=py311h533ab2d_0
websockets=14.2=pypi_0
wheel=0.45.1=pyhd8ed1ab_1
whisper=1.1.10=pypi_0
yaml=0.2.5=h8ffe710_2
yarl=1.20.0=pypi_0
zstandard=0.23.0=pypi_0
```

## 📄 Code in `backend\package.json`
```code
{
  "dependencies": {
    "class-variance-authority": "^0.7.1"
  }
}
```

## 📄 Code in `backend\persona_image_mapping.xlsx`
⚠️ Error reading file: 'utf-8' codec can't decode bytes in position 15-16: invalid continuation byte

## 📄 Code in `backend\pyvenv.cfg`
```code
home = C:\Users\ali05\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0
include-system-site-packages = false
version = 3.13.3
executable = C:\Users\ali05\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\python.exe
command = C:\Users\ali05\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\python.exe -m venv C:\projects\agentic-platform\backend
```

## 📄 Code in `backend\updated_persona_image_mapping.xlsx`
⚠️ Error reading file: 'utf-8' codec can't decode byte 0x8f in position 22: invalid start byte

## 📄 Code in `backend\app\main.py`
```code
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import orientation, define, export_persona

app = FastAPI(title="Agentic UX Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

app.include_router(orientation.router, prefix="/api/orientation", tags=["Orientation"])
app.include_router(define.router, prefix="/api/define", tags=["Define"])
app.include_router(export_persona.router, prefix="/api/export", tags=["Export"])

@app.get("/")
def root():
    return {"message": "Agentic UX API is running"}
```

## 📄 Code in `backend\app\agents\persona_agent.py`
```code
import json
import re
from typing import List, Dict, Union
from pydantic import BaseModel, ValidationError
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
from app.core.config import GROQ_API_KEY


# ------------------ Pydantic Models ------------------ #
class ClassicPersona(BaseModel):
    name: str
    title: str
    type: str
    location: str
    generation: str
    status: str
    income: str
    background: List[str]
    personality: Dict[str, int]
    behaviorTags: List[str]
    goals: List[str]
    painPoints: List[str]
    motivations: Dict[str, int]
    tools: List[str]


class AgilePersona(BaseModel):
    name: str
    role: str
    location: str
    type: str
    status: str
    archetype: str
    goals: List[str]
    painPoints: List[str]
    tools: List[str]


class JTBDPersona(BaseModel):
    name: str
    role: str
    location: str
    archetype: str
    type: str
    goals_jtbd: List[str]
    motivations: Dict[str, int]
    scenarios: List[str]
    tools: List[str]


class EmpathyPersona(BaseModel):
    name: str
    title: str
    location: str
    archetype: str
    type: str
    background: List[str]
    behaviorTags: List[str]
    painPoints: List[str]
    motivations: Dict[str, int]
    scenarios: List[str]
    personality: Dict[str, int]


# ------------------ Format Instructions ------------------ #
def get_format_instructions_by_type(persona_type: str) -> str:
    templates = {
        "Classic": """
Return a JSON object with the following keys:
- name, title, type, location (state and country), generation, status, income: strings
- background: list of strings
- personality: dictionary (4 traits, 0–100)
- behaviorTags: list of strings
- goals: list of strings
- painPoints: list of strings
- motivations: dictionary (3–4 traits, 0–100)
- tools: list of strings
Only return the JSON.
""",
        "Agile": """
Return a JSON object with the following keys:
- type="Agile" (Send always "Agile")
- name, role, location (state and country), type="Agile", status, archetype: strings
- goals: list of strings
- painPoints: list of strings
- tools: list of strings
Only return the JSON.
""",
        "JTBD": """
Return a JSON object with the following keys:
- name, role, location (state and country), archetype: strings,  type="JTBD",
- type="JTBD" (Send always "JTBD")
- goals_jtbd: list of strings
- motivations: dictionary (0–100 values)
- scenarios: list of strings
- tools: list of strings
Only return the JSON.
""",
        "Empathy": """
Return a JSON object with the following keys:
- name, title, location (state and country), archetype: strings,
- type="Empathy" (Send always "Empathy")
- background: list of strings
- behaviorTags: list of strings
- painPoints: list of strings
- motivations: dictionary (0–100 values)
- scenarios: list of strings
- personality: dictionary (MBTI traits 0–100)
Only return the JSON.
"""
    }
    return templates.get(persona_type, "")


# ------------------ Prompt Template ------------------ #
prompt = ChatPromptTemplate.from_messages([
    ("system", """You're a veteran UX strategist with 15+ years of experience. Generate actionable, psychologically nuanced UX personas that:
1. Reflect real user research insights
2. Contain contradictions and complexities found in real humans
3. Prioritize design-actionable insights over demographics
4. Include behavioral triggers and decision-making patterns
5. Connect pain points directly to design opportunities
6. Include cultural behaviors, language preferences, and regional traits based on specified location (e.g., India vs US vs Brazil)
7. Contain contradictions and complexities found in real humans
"""),

    ("human", """## Persona Specification
**Type**: {persona_type}
**Project**: {project_name}
**User Role**: {target_user_role}
**Product Context**: {product_context}
**Location**: {location}

## Strategic Considerations
- Include 1-2 paradoxical traits (e.g.: "Values efficiency but spends hours curating perfect playlists")
- Map pain points to HMW opportunities
- Indicate behavioral thresholds (e.g.: "Abandons flow after 2 friction points")
- Add technology adoption psychographics

{format_instructions}

## Veteran UX Notes
Focus on these when generating:
- Behavioral economics triggers
- Decision-making heuristics
- Contextual environmental factors
- Unspoken emotional drivers
""")
])


# ------------------ LangChain Model ------------------ #
llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="qwen-qwq-32b",
    temperature=0.4
)

persona_chain = prompt | llm


# ------------------ Main Persona Generator ------------------ #
def generate_persona(data: dict) -> Union[BaseModel, dict]:
    persona_type = data["persona_type"]
    format_instructions = get_format_instructions_by_type(persona_type)

    input_for_prompt = {
        "project_name": data["project_name"],
        "target_user_role": data["target_user_role"],
        "product_context": data["product_context"],
        "persona_type": persona_type,
        "location": data["location"],
        "format_instructions": format_instructions
    }

    raw_output = persona_chain.invoke(input_for_prompt)
    output_text = raw_output.content if hasattr(raw_output, "content") else str(raw_output)

    try:
        json_match = re.search(r"\{[\s\S]*\}", output_text)
        if not json_match:
            raise ValueError("No JSON object found in LLM response.")

        json_str = json_match.group(0).strip()
        persona_data = json.loads(json_str)

        # Validate and parse with Pydantic
        model_map = {
            "Classic": ClassicPersona,
            "Agile": AgilePersona,
            "JTBD": JTBDPersona,
            "Empathy": EmpathyPersona
        }

        model = model_map.get(persona_type)
        if not model:
            raise ValueError("Unsupported persona type.")

        return model.parse_obj(persona_data)

    except (json.JSONDecodeError, ValidationError, ValueError) as e:
        raise e
```

## 📄 Code in `backend\app\agents\persona_image_mapper.py`
```code
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
```

## 📄 Code in `backend\app\agents\persona_image_mapping.xlsx`
⚠️ Error reading file: 'utf-8' codec can't decode byte 0x8f in position 22: invalid start byte

## 📄 Code in `backend\app\api\deps.py`
```code
from fastapi import Header, HTTPException
import os
import jwt

JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")  # Found in Supabase > Project Settings > API

async def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")
    token = authorization.split(" ")[1]
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return decoded  # contains user info like sub (user_id), email, etc.
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid Supabase JWT token")
```

## 📄 Code in `backend\app\api\routes\define.py`
```code
from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, Header
from pydantic import BaseModel
from app.agents.persona_agent import generate_persona
from app.db.supabase_client import insert_persona_to_supabase
from app.agents.persona_image_mapper import find_best_image_for_persona
import uuid
import json, base64
from typing import Optional

router = APIRouter()

def update_persona_image(persona_id, persona_json):
    print(f"[Define] Sending request to image mapper for persona_id: {persona_id}")
    try:
        image_path = find_best_image_for_persona(persona_json)
        
        if image_path:
            from app.db.supabase_client import supabase
            supabase.table("personas").update({"profile_image_url": image_path}).eq("id", persona_id).execute()
            
    except Exception as e:
        print(f"[Define] Error in image mapping for persona_id: {persona_id}: {e}")

def _decode_user(authorization: Optional[str] = Header(None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.split(" ", 1)[1]
    try:
        payload_part = token.split(".")[1]
        padded = payload_part + "=" * (-len(payload_part) % 4)
        payload = json.loads(base64.urlsafe_b64decode(padded).decode())
        return payload.get("sub")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

# ----------- Input Schema ----------- #
class PersonaSeed(BaseModel):
    project_name: str
    target_user_role: str
    product_context: str
    persona_type: str
    location: str

# ----------- Route ----------- #
@router.post("/persona")
def generate_persona_route(input_data: PersonaSeed, background_tasks: BackgroundTasks, user_id: str = Depends(_decode_user)):
    print("[Define] Received request to generate persona", input_data)
    try:
        
        result = generate_persona(input_data.dict())
        persona_json = result.dict() if hasattr(result, 'dict') else dict(result) 
        persona_id = str(uuid.uuid4())
        _, design_token = insert_persona_to_supabase(persona_id, persona_json.get("type"), persona_json, None, user_id=user_id)
        background_tasks.add_task(update_persona_image, persona_id, persona_json)
        return {"id": persona_id, **persona_json, "profile_image_url": None, "design_token": design_token}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/persona/status/{persona_id}")
def poll_persona_status(persona_id: str):
    from app.db.supabase_client import supabase
    try:
        res = supabase.table("personas").select("*").eq("id", persona_id).single().execute()
        if hasattr(res, "error") and res.error:
            raise HTTPException(status_code=404, detail="Persona not found")
        if res.data:
            return res.data
        raise HTTPException(status_code=404, detail="Persona not found")
    except Exception:
        raise HTTPException(status_code=404, detail="Persona not found")
```

## 📄 Code in `backend\app\api\routes\export_persona.py`
```code
from fastapi import APIRouter, HTTPException, Depends, Header, Body, BackgroundTasks
from typing import Optional
from pydantic import BaseModel
import json, base64
from app.db.supabase_client import supabase
import uuid
from app.agents.persona_image_mapper import find_best_image_for_persona
import secrets

router = APIRouter()


def _decode_user(authorization: Optional[str] = Header(None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.split(" ", 1)[1]
    try:
        payload_part = token.split(".")[1]
        padded = payload_part + "=" * (-len(payload_part) % 4)
        payload = json.loads(base64.urlsafe_b64decode(padded).decode())
        return payload.get("sub")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


class PersonaExport(BaseModel):
    project_id: Optional[str] = None
    type: str
    persona_json: dict


def map_and_update_image(persona_id, persona_json):
    image_path = find_best_image_for_persona(persona_json)
    if image_path:
        supabase.table("personas").update({"profile_image_url": image_path}).eq("id", persona_id).execute()
        print(f"[Persona Update] persona_id: {persona_id}, updated profile_image_url: {image_path}")

'''
@router.post("/persona")
def save_persona(data: PersonaExport, user_id: str = Depends(_decode_user), background_tasks: BackgroundTasks = None):
    persona_id = str(uuid.uuid4())
    design_token = secrets.token_urlsafe(12)
    persona_data = {
        "id": persona_id,
        "type": data.type,
        "persona_json": data.persona_json,
        "profile_image_url": None,
        "user_id": user_id,
        "project_id": data.project_id,
        "design_token": design_token
    }
    res = supabase.table("personas").insert(persona_data).execute()
    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=500, detail=str(res.error))
    # Trigger background image mapping
    if background_tasks is not None:
        background_tasks.add_task(map_and_update_image, persona_id, data.persona_json)
    return {"id": persona_id, **persona_data}
'''

@router.get("/persona/me")
def list_my_personas(user_id: str = Depends(_decode_user)):
    res = supabase.table("personas").select("*").eq("user_id", user_id).execute()
    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=500, detail=str(res.error))
    return res.data


@router.get("/persona/{persona_id}")
def get_persona(persona_id: str, user_id: str = Depends(_decode_user)):
    res = supabase.table("personas").select("*").eq("id", persona_id).eq("user_id", user_id).single().execute()
    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=404, detail="Persona not found")
    if res.data:
        return res.data
    raise HTTPException(status_code=404, detail="Persona not found")


@router.delete("/persona/{persona_id}")
def delete_persona(persona_id: str, user_id: str = Depends(_decode_user)):
    res = supabase.table("personas").delete().eq("id", persona_id).eq("user_id", user_id).execute()
    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=404, detail="Persona not found")
    return {"ok": True}


@router.get("/public/persona/{token}")
def get_public_persona(token: str):
    res = supabase.table("personas").select("*").eq("design_token", token).single().execute()
    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=404, detail="Persona not found")
    if res.data:
        combined = {
            **res.data["persona_json"],
            "profile_image_url": res.data.get("profile_image_url")
        }
        return combined
    raise HTTPException(status_code=404, detail="Persona not found")


@router.post("/persona/map-image")
def map_persona_to_image(persona: dict = Body(...)):
    """
    Given a persona JSON, return the best matching image path from the mapping Excel.
    """
    image_path = find_best_image_for_persona(persona)
    return {"image_path": image_path}


@router.post("/persona/fix-missing-tokens")
def fix_missing_design_tokens():
    res = supabase.table("personas").select("id,design_token").execute()
    updated = 0
    for p in res.data:
        if not p.get("design_token"):
            token = secrets.token_urlsafe(12)
            supabase.table("personas").update({"design_token": token}).eq("id", p["id"]).execute()
            updated += 1
    return {"updated": updated, "message": f"Updated {updated} personas with missing design_token."}


class ThemeUpdate(BaseModel):
    theme: str

@router.patch("/persona/{persona_id}/theme")
def update_persona_theme(persona_id: str, payload: ThemeUpdate, user_id: str = Depends(_decode_user)):
    res = supabase.table("personas").update({"theme": payload.theme}).eq("id", persona_id).eq("user_id", user_id).execute()
    if hasattr(res, "error") and res.error:
        raise HTTPException(status_code=404, detail="Persona not found or update failed")
    # Fetch updated persona
    persona = supabase.table("personas").select("*").eq("id", persona_id).eq("user_id", user_id).single().execute()
    if hasattr(persona, "error") and persona.error:
        raise HTTPException(status_code=404, detail="Persona not found after update")
    return persona.data
```

## 📄 Code in `backend\app\api\routes\orientation.py`
```code
from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter()

class OrientationInput(BaseModel):
    project_id: str
    app_idea: str
    target_user: str

@router.post("/")
async def run_orientation(input: OrientationInput):
    output = {
        "requirement_doc": f"Generated requirement for {input.app_idea}",
        "project_id": input.project_id
    }
    return {"status": "success", "output": output}
```

## 📄 Code in `backend\app\core\config.py`
```code
from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Agentic UX Platform"
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")


settings = Settings()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is missing in the .env file.")
```

## 📄 Code in `backend\app\db\persona_store.py`
```code
import json
import uuid
from pathlib import Path
from datetime import datetime
import secrets
import os
from app.services.together_image import generate_stability_image
from app.db.supabase_client import upload_image_to_supabase

DATA_FILE = Path(__file__).resolve().parent / "persona_exports.json"


def _load():
    if DATA_FILE.exists():
        with open(DATA_FILE) as f:
            return json.load(f)
    return []


def _save(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f)


def create_persona(user_id: str, project_id: str | None, type: str, persona_json: dict) -> dict:
    data = _load()
    # Build prompt using the provided template
    name = persona_json.get('name', 'User')
    title = persona_json.get('title') or persona_json.get('role') or persona_json.get('type', '')
    location = persona_json.get('location') or 'US'
    prompt = f"""Generate a professional UX persona profile portrait for the following individual. The image should represent the user's role, personality, and context. Style should be realistic, clean, and suitable for a design document.

## Persona Summary:
- Name: {name}
- Role/Title: {title}
- Location: {location}

## Visual Style Guidelines:
- Portrait or upper-body headshot
- Realistic photography style
- Neutral or clean background (white or light gray)
- Soft lighting, natural facial expression
- No text, logo, or filters
"""
    # Generate image and upload to Supabase
    persona_id = str(uuid.uuid4())
    local_image_path = generate_stability_image(prompt, filename=f"persona_{persona_id}.jpeg")
    profile_image_url = None
    if local_image_path:
        try:
            profile_image_url = upload_image_to_supabase(local_image_path, dest_filename=f"persona_{persona_id}.jpeg")
            os.remove(local_image_path)  # Clean up local file
        except Exception as e:
            pass
    item = {
        "id": persona_id,
        "user_id": user_id,
        "project_id": project_id,
        "type": type,
        "persona_json": persona_json,
        "created_at": datetime.utcnow().isoformat(),
        "design_token": secrets.token_urlsafe(12),
        "profile_image_url": profile_image_url
    }
    data.append(item)
    _save(data)
    return item


def list_personas(user_id: str) -> list[dict]:
    return [item for item in _load() if item.get("user_id") == user_id]


def get_persona(persona_id: str) -> dict | None:
    for item in _load():
        if item["id"] == persona_id:
            return item
    return None


def delete_persona(persona_id: str, user_id: str) -> bool:
    data = _load()
    new_data = [item for item in data if not (item["id"] == persona_id and item["user_id"] == user_id)]
    _save(new_data)
    return len(new_data) != len(data)
```

## 📄 Code in `backend\app\db\supabase_client.py`
```code
import os
from supabase import create_client, Client
import secrets

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def upload_image_to_supabase(file_path: str, bucket: str = "persona-images", dest_filename: str = None) -> str:
    """
    Uploads an image to the specified Supabase storage bucket and returns the public URL.
    """
    if dest_filename is None:
        dest_filename = os.path.basename(file_path)
    with open(file_path, "rb") as f:
        res = supabase.storage.from_(bucket).upload(dest_filename, f)
    if hasattr(res, "error") and res.error:
        raise Exception(f"Supabase upload error: {res.error}")
    # Get the public URL
    public_url = supabase.storage.from_(bucket).get_public_url(dest_filename)
    return public_url

def insert_persona_to_supabase(id: str, type: str, persona_json: dict, profile_image_url: str = None, user_id: str = None):
    """
    Inserts a persona record into the 'personas' table in Supabase.
    """
    design_token = secrets.token_urlsafe(12)
    data = {
        "id": id,
        "type": type,
        "persona_json": persona_json,
        "profile_image_url": profile_image_url,
        "design_token": design_token,
        "theme": "purple",  # Set default theme
    }
    if user_id:
        data["user_id"] = user_id
    res = supabase.table("personas").insert(data).execute()
    if hasattr(res, "error") and res.error:
        raise Exception(f"Supabase insert error: {res.error}")
    return res, design_token
```

## 📄 Code in `backend\app\services\together_image.py`
```code
import os
import requests

def generate_stability_image(prompt: str, filename: str = "stability_image.jpeg"):
    api_key = os.getenv("STABILITY_API_KEY")
    if not api_key:
        return None
    url = "https://api.stability.ai/v2beta/stable-image/generate/sd3"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "accept": "image/*",
        "Content-Type": "application/json"
    }
    data = {
        "prompt": prompt,
        "output_format": "jpeg",
        "width": 256,
        "height": 256
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        with open(filename, 'wb') as file:
            file.write(response.content)
        file_size_kb = os.path.getsize(filename) / 1024
        return filename
    else:
        return None

def build_image_prompt_from_persona(persona: dict) -> str:
    # Example: You can make this as rich as you want!
    name = persona.get('name', 'User')
    title = persona.get('title') or persona.get('role') or persona.get('type', '')
    location = persona.get('location', 'US')
    archetype = persona.get('archetype', '')
    background = ', '.join(persona.get('background', []))
    personality = ', '.join(f"{k}: {v}" for k, v in persona.get('personality', {}).items())
    # Add more fields as needed

    prompt = (
        f"Professional UX persona portrait. "
        f"Name: {name}. "
        f"Role/Title: {title}. "
        f"Location: {location}. "
        f"Archetype: {archetype}. "
        f"Background: {background}. "
        f"Personality traits: {personality}. "
        f"Realistic, clean background, soft lighting, upper-body headshot, no text or logos."
    )
    return prompt
```

## 📄 Code in `figma plugin\code.js`
```code
// Common Struction Function
figma.showUI(__html__, { width: 450, height: 300 });

figma.ui.onmessage = async (msg) => {
  await ensureFonts(); // make sure fonts are loaded

  const persona = msg.payload;

  switch (persona.type) {
    case "Classic":
      await renderClassicPersona(persona);
      figma.closePlugin("Success: Classic Persona rendered from token");
      break;
    case "Agile":
      await renderAgilePersona(persona);
      figma.closePlugin("Success: Agile Persona rendered from token");
      break;
    case "JTBD":
      await renderJtbdPersona(persona);
      figma.closePlugin("Success: JTBD Persona rendered from token");
      break;
    case "Empathy":
      await renderEmpathyPersona(persona);
      figma.closePlugin("Success: Empathy Persona rendered from token");
      break;
    default:
      figma.closePlugin("Error: Unknown persona type");
  }
};


function createText(text, fontSize, fontWeight, color, align = "CENTER") {
  const node = figma.createText();
  node.characters = text || "-"; // prevent null/undefined issues
  node.fontSize = fontSize;
  node.fontName = { family: "Inter", style: fontWeight };
  node.fills = [{ type: "SOLID", color }];
  node.textAlignHorizontal = align;
  return node;
}

function createCard(titleText, items = []) {
  const card = figma.createFrame();
  card.layoutMode = "VERTICAL";
  card.counterAxisAlignItems = "MIN";
  card.itemSpacing = 10;
  card.paddingLeft = 16;
  card.paddingRight = 16;
  card.paddingTop = 16;
  card.paddingBottom = 16;
  card.cornerRadius = 10;
  card.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  card.layoutGrow = 1;
  card.minWidth = 439;

  const title = figma.createText();
  title.characters = titleText || "Untitled";
  title.fontSize = 22;
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
  card.appendChild(title);

  if (typeof items === "string") {
    const item = figma.createText();
    item.characters = items || "-";
    item.fontSize = 14;
    item.fontName = { family: "Inter", style: "Regular" };
    item.lineHeight = { unit: "PIXELS", value: 20 };
    item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    card.appendChild(item);
  } else if (Array.isArray(items)) {
    items.forEach(text => {
      const item = figma.createText();
      item.characters = text || "-";
      item.fontSize = 14;
      item.lineHeight = { unit: "PIXELS", value: 20 };
      item.fontName = { family: "Inter", style: "Regular" };
      item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
      card.appendChild(item);
    });
  }

  return card;
}
// First Column
async function createFirstColumn(persona) {
  const col = figma.createFrame();
  col.layoutMode = "VERTICAL";
  col.itemSpacing = 48;
  col.paddingLeft = 24;
  col.paddingRight = 24;
  col.paddingTop = 24;
  col.paddingBottom = 24;
  col.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  col.resize(302, 752);
  col.cornerRadius = 10;


  async function createAvatarEllipse(imageUrl) {
    const ellipse = figma.createEllipse();
    ellipse.resize(254, 254);
    ellipse.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    ellipse.strokeWeight = 6;
  
    if (imageUrl) {
      try {
        const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
        const imageHash = figma.createImage(new Uint8Array(imageBytes)).hash;
        ellipse.fills = [{
          type: "IMAGE",
          scaleMode: "FILL",
          imageHash
        }];
      } catch (error) {
        console.error("Failed to load image:", error);
        ellipse.fills = [{ type: "SOLID", color: { r: 1, g: 0.85, b: 0.8 } }];
      }
    } else {
      ellipse.fills = [{ type: "SOLID", color: { r: 1, g: 0.85, b: 0.8 } }];
    }
  
    return ellipse;
  }

  const avatar = await createAvatarEllipse(persona.profile_image_url);
  col.appendChild(avatar);

  const nameTitleBox = figma.createFrame();
  nameTitleBox.layoutMode = "VERTICAL";
  nameTitleBox.primaryAxisAlignItems = "CENTER";

  nameTitleBox.itemSpacing = 8;
  nameTitleBox.paddingLeft = 0;
  nameTitleBox.paddingRight = 0;
  nameTitleBox.layoutAlign = 'STRETCH';
  nameTitleBox.paddingTop = 0;
  nameTitleBox.counterAxisAlignItems = "CENTER"
  nameTitleBox.paddingBottom = 0;
  nameTitleBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }]; // #FFEEE8

  const name = createText(persona.name, 32, "Semi Bold", { r: 0.2, g: 0.2, b: 0.2 });
  const title = createText(persona.title, 18, "Semi Bold", { r: 0.77, g: 0, b: 0.03 });

  nameTitleBox.appendChild(name);
  nameTitleBox.appendChild(title);

  const addInfoRow = (label, value) => {
    const row = figma.createText();
    const fullText = `${label} ${value}`;
    row.characters = fullText;
    row.fontSize = 14;
    row.lineHeight = { unit: "PIXELS", value: 20 };

    row.setRangeFontName(0, label.length, { family: "Inter", style: "Semi Bold" });
    row.setRangeFills(0, label.length, [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }]);

    row.setRangeFontName(label.length + 1, fullText.length, { family: "Inter", style: "Regular" });
    row.setRangeFills(label.length + 1, fullText.length, [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }]);
    return row;
  };

  const infoBox = figma.createFrame();
  infoBox.layoutMode = "VERTICAL";
  infoBox.primaryAxisAlignItems = "CENTER";
  infoBox.counterAxisAlignItems = "CENTER"
  infoBox.itemSpacing = 2;
  infoBox.paddingLeft = 16;
  infoBox.paddingRight = 16;
  infoBox.paddingTop = 16;
  infoBox.paddingBottom = 16;
  infoBox.cornerRadius = 10;
  infoBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.86, b: 0.79 } }];
  infoBox.minWidth = 254;


  infoBox.appendChild(addInfoRow("Location", persona.location));
  infoBox.appendChild(addInfoRow("Generation", persona.generation));
  infoBox.appendChild(addInfoRow("Status", persona.status));
  infoBox.appendChild(addInfoRow("Income", persona.income));

  col.appendChild(avatar);
  col.appendChild(nameTitleBox);
  col.appendChild(infoBox);

  return col;
}


function createCard(titleText, items = []) {
  const card = figma.createFrame();
  card.layoutMode = "VERTICAL";
  card.counterAxisAlignItems = "MIN";
  card.itemSpacing = 10;
  card.paddingLeft = 16;
  card.paddingRight = 16;
  card.paddingTop = 16;
  card.paddingBottom = 16;
  card.cornerRadius = 10;
  card.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  card.layoutGrow = 1;
  card.minWidth = 439;

  const title = figma.createText();
  title.characters = titleText;
  title.fontSize = 22;
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];

  card.appendChild(title);

  items.forEach(text => {
    const item = figma.createText();
    item.characters = text || "-";
    item.fontSize = 14;
    item.lineHeight = { unit: "PIXELS", value: 20 };
    item.fontName = { family: "Inter", style: "Regular" };
    item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    card.appendChild(item);
  });

  return card;
}

function ensureFonts() {
  return Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Light" })
  ]);
}

function createSlider(label, percent) {
  const wrap = figma.createFrame();
  wrap.layoutMode = "VERTICAL";
  wrap.itemSpacing = 4;
  wrap.counterAxisAlignItems = "MIN";
  wrap.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  wrap.counterAxisSizingMode = 'AUTO';

  const lbl = figma.createText();
  lbl.characters = label;
  lbl.fontSize = 14;
  lbl.fontName = { family: "Inter", style: "Regular" };
  lbl.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];

  const track = figma.createFrame();
  track.resize(390, 8);
  track.fills = [{ type: "SOLID", color: { r: 1, g: 0.866, b: 0.831 } }];
  track.cornerRadius = 4;
  track.counterAxisSizingMode = 'AUTO';

  const fill = figma.createRectangle();
  fill.resize(390 * percent, 8);
  fill.fills = [{ type: "SOLID", color: { r: 0.78, g: 0, b: 0.06 } }];
  fill.cornerRadius = 4;

  track.appendChild(fill);
  wrap.appendChild(lbl);
  wrap.appendChild(track);
  return wrap;
}

function createPersonalityCard(data) {
  const card = createCard("Personality");
  Object.entries(data).forEach(([trait, value]) => {
    const slider = createSlider(trait, value / 100);
    card.appendChild(slider);
  });
  return card;
}

function createMotivationsCard(motivations) {
  const card = createCard("Motivations");
  Object.entries(motivations).forEach(([label, value]) => {
    const slider = createSlider(label, value / 100);
    card.appendChild(slider);
  });
  return card;
}
//Classic//

async function renderClassicPersona(persona) {
  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.primaryAxisAlignItems = "MIN";
    col.itemSpacing = 24;
    col.paddingLeft = 0;
    col.paddingRight = 0;
    col.paddingTop = 0;
    col.paddingBottom = 0;
    col.resize(439, 752);

    // Background
    const background = Array.isArray(persona.background)
      ? persona.background
      : [persona.background || "Not provided"];
    col.appendChild(createCard("Background", background));

    // Personality
    col.appendChild(createPersonalityCard(persona.personality || {}));

    // Behavior Tags
    if (persona.behaviorTags && Array.isArray(persona.behaviorTags)) {
      const card = figma.createFrame();
      card.layoutMode = "VERTICAL";
      card.counterAxisAlignItems = "MIN";
      card.itemSpacing = 10;
      card.paddingLeft = 16;
      card.paddingRight = 16;
      card.paddingTop = 16;
      card.paddingBottom = 16;
      card.cornerRadius = 10;
      card.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
      card.layoutGrow = 1;
      card.minWidth = 439;

      const title = figma.createText();
      title.characters = "Behavior Tags";
      title.fontSize = 22;
      title.fontName = { family: "Inter", style: "Semi Bold" };
      title.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
      card.appendChild(title);

      const tagWrap = figma.createFrame();
      tagWrap.layoutMode = "HORIZONTAL";
      tagWrap.layoutWrap = "WRAP";
      tagWrap.itemSpacing = 8;
      tagWrap.fills = [];

      persona.behaviorTags.forEach(tag => {
        const pill = figma.createFrame();
        pill.layoutMode = "HORIZONTAL";
        pill.paddingLeft = 12;
        pill.paddingRight = 12;
        pill.paddingTop = 4;
        pill.paddingBottom = 4;
        pill.cornerRadius = 15;
        pill.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0.95 } }];

        const pillText = figma.createText();
        pillText.characters = tag;
        pillText.fontSize = 12;
        pillText.fontName = { family: "Inter", style: "Regular" };
        pillText.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.1, b: 0.4 } }];

        pill.appendChild(pillText);
        tagWrap.appendChild(pill);
      });

      card.appendChild(tagWrap);
      col.appendChild(card);
    }

    // Pain Points
    const painPoints = Array.isArray(persona.painPoints)
      ? persona.painPoints
      : [persona.painPoints || "Not provided"];
    col.appendChild(createCard("Pain Points", painPoints));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.primaryAxisAlignItems = "MIN";
    col.itemSpacing = 24;
    col.paddingLeft = 0;
    col.paddingRight = 0;
    col.paddingTop = 0;
    col.paddingBottom = 0;
    col.resize(439, 752);

    // Motivations
    col.appendChild(createMotivationsCard(persona.motivations || {}));

    // Goals
    const goals = Array.isArray(persona.goals)
      ? persona.goals
      : [persona.goals || "Not provided"];
    col.appendChild(createCard("Goals", goals));

    // Favourite Brands
    if (persona.favouriteBrands && Array.isArray(persona.favouriteBrands)) {
      const card = createCard("Favourite Brands");
      const wrap = figma.createFrame();
      wrap.layoutMode = "HORIZONTAL";
      wrap.layoutWrap = "WRAP";
      wrap.itemSpacing = 8;
      wrap.counterAxisAlignItems = "CENTER";
      wrap.fills = [];

      persona.favouriteBrands.forEach(brand => {
        const tag = figma.createFrame();
        tag.layoutMode = "HORIZONTAL";
        tag.paddingLeft = 12;
        tag.paddingRight = 12;
        tag.paddingTop = 4;
        tag.paddingBottom = 4;
        tag.cornerRadius = 100;
        tag.fills = [{ type: "SOLID", color: { r: 0.89, g: 0.95, b: 1 } }];

        const txt = figma.createText();
        txt.characters = brand;
        txt.fontSize = 12;
        txt.fontName = { family: "Inter", style: "Regular" };
        txt.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.3, b: 0.8 } }];

        tag.appendChild(txt);
        wrap.appendChild(tag);
      });

      card.appendChild(wrap);
      col.appendChild(card);
    }

    return col;
  }

  const main = figma.createFrame();
  main.name = "Classic Persona";
  main.layoutMode = "HORIZONTAL";
  main.counterAxisAlignItems = "MIN";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = await createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}

async function renderAgilePersona(persona) {
  function createBrandsCard(brands) {
    const card = createCard("Favourite Brands");
    const wrap = figma.createFrame();
    wrap.layoutMode = "HORIZONTAL";
    wrap.layoutWrap = "WRAP";
    wrap.itemSpacing = 8;
    wrap.counterAxisAlignItems = "CENTER";
    wrap.fills = [];

    brands.forEach(brand => {
      const tag = figma.createFrame();
      tag.layoutMode = "HORIZONTAL";
      tag.paddingLeft = 12;
      tag.paddingRight = 12;
      tag.paddingTop = 4;
      tag.paddingBottom = 4;
      tag.cornerRadius = 100;
      tag.fills = [{ type: "SOLID", color: { r: 0.89, g: 0.95, b: 1 } }];

      const txt = figma.createText();
      txt.characters = brand;
      txt.fontSize = 12;
      txt.fontName = { family: "Inter", style: "Regular" };
      txt.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.3, b: 0.8 } }];

      tag.appendChild(txt);
      wrap.appendChild(tag);
    });

    card.appendChild(wrap);
    return card;
  }

  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const goals = Array.isArray(persona.goals) ? persona.goals : [persona.goals || "Not provided"];
    const painPoints = Array.isArray(persona.painPoints) ? persona.painPoints : [persona.painPoints || "Not provided"];

    col.appendChild(createCard("Goals", goals));
    col.appendChild(createCard("Pain Points", painPoints));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const brands = Array.isArray(persona.tools) ? persona.tools : [persona.tools || "Not provided"];
    col.appendChild(createBrandsCard(brands));

    return col;
  }

  const main = figma.createFrame();
  main.name = "Agile Persona";
  main.layoutMode = "HORIZONTAL";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = await createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}


async function renderJtbdPersona(persona) {
  function createBrandsCard(brands) {
    const card = createCard("Favourite Brands");
    const wrap = figma.createFrame();
    wrap.layoutMode = "HORIZONTAL";
    wrap.layoutWrap = "WRAP";
    wrap.itemSpacing = 8;
    wrap.counterAxisAlignItems = "CENTER";
    wrap.fills = [];

    brands.forEach(brand => {
      const tag = figma.createFrame();
      tag.layoutMode = "HORIZONTAL";
      tag.paddingLeft = 12;
      tag.paddingRight = 12;
      tag.paddingTop = 4;
      tag.paddingBottom = 4;
      tag.cornerRadius = 100;
      tag.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0.95 } }];

      const txt = figma.createText();
      txt.characters = brand;
      txt.fontSize = 12;
      txt.fontName = { family: "Inter", style: "Regular" };
      txt.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.1, b: 0.4 } }];

      tag.appendChild(txt);
      wrap.appendChild(tag);
    });

    card.appendChild(wrap);
    return card;
  }

  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const goals = Array.isArray(persona.goals_jtbd) ? persona.goals_jtbd : [persona.goals_jtbd || "Not provided"];
    const scenarios = Array.isArray(persona.scenarios) ? persona.scenarios : [persona.scenarios || "Not provided"];

    col.appendChild(createCard("Goals (JTBD)", goals));
    col.appendChild(createCard("Scenarios", scenarios));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    col.appendChild(createMotivationsCard(persona.motivations || {}));

    const brands = Array.isArray(persona.tools) ? persona.tools : [persona.tools || "Not provided"];
    col.appendChild(createBrandsCard(brands));

    return col;
  }

  const main = figma.createFrame();
  main.name = "JTBD Persona";
  main.layoutMode = "HORIZONTAL";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = await createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}



async function renderEmpathyPersona(persona) {
  function createTagPill(text) {
    const pillFrame = figma.createFrame();
    pillFrame.layoutMode = "HORIZONTAL";
    pillFrame.counterAxisAlignItems = "CENTER";
    pillFrame.itemSpacing = 0;
    pillFrame.paddingLeft = 12;
    pillFrame.paddingRight = 12;
    pillFrame.paddingTop = 4;
    pillFrame.paddingBottom = 4;
    pillFrame.cornerRadius = 100;
    pillFrame.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0.95 } }];

    const pillText = figma.createText();
    pillText.characters = text;
    pillText.fontSize = 12;
    pillText.fontName = { family: "Inter", style: "Regular" };
    pillText.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.1, b: 0.4 } }];

    pillFrame.appendChild(pillText);
    return pillFrame;
  }

  function createBehaviorTagsCard(tags) {
    const card = createCard("Behavior Tags");
    const tagWrap = figma.createFrame();
    tagWrap.layoutMode = "HORIZONTAL";
    tagWrap.layoutWrap = "WRAP";
    tagWrap.itemSpacing = 8;
    tagWrap.fills = [];

    tags.forEach(tag => {
      const pill = createTagPill(tag);
      tagWrap.appendChild(pill);
    });

    card.appendChild(tagWrap);
    return card;
  }

  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const background = Array.isArray(persona.background) ? persona.background : [persona.background || "Not provided"];
    col.appendChild(createCard("Background", background));

    if (Array.isArray(persona.behaviorTags)) {
      col.appendChild(createBehaviorTagsCard(persona.behaviorTags));
    }

    col.appendChild(createPersonalityCard(persona.personality || {}));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const painPoints = Array.isArray(persona.painPoints) ? persona.painPoints : [persona.painPoints || "Not provided"];
    col.appendChild(createCard("Pain Points", painPoints));

    col.appendChild(createMotivationsCard(persona.motivations || {}));

    const scenarios = Array.isArray(persona.scenarios) ? persona.scenarios : [persona.scenarios || "Not provided"];
    col.appendChild(createCard("Scenarios", scenarios));

    return col;
  }

  const main = figma.createFrame();
  main.name = "Empathy Persona";
  main.layoutMode = "HORIZONTAL";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = await createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}

/*

(async () => {
  await ensureFonts();

  const persona = {
    "name": "Jordan James",
    "title": "Researcher",
    "type": "Classic",
    "location": "California",
    "generation": "Gen Z / 20 years",
    "status": "Single • No kids",
    "income": "Average (+13%)",
    "background": [
      "Moved to California",
      "Instagram influencer (12k followers)",
      "Cares about sustainability and wellness"
    ],
    "personality": {
      "Introvert": 60,
      "Intuition": 85,
      "Feeling": 50,
      "Perceiving": 95
    },
    "behaviorTags": ["Task Switcher (3–5 apps open at all times)", "Tech Skeptic (relies on email despite knowing better)", "Social Media Minimalist (LinkedIn only for networking)", "Last-Minute Innovator (best work under deadlines)"],
    "goals": [
      "Promote wellness and eco-friendly products",
      "Engage Gen Z audiences",
      "Stay authentic in brand partnerships"
    ],
    "painPoints": [
      "Overwhelmed by content scheduling",
      "Difficulty finding ethical sponsors",
      "Struggles with platform changes"
    ],
    "tools": ["Instagram", "Canva", "Notion", "InShot"],
    "motivations": {
      "Creativity": 90,
      "Growth": 80,
      "Stability": 60,
      "Recognition": 70
    },
    "scenario": "Jordan checks her favorite wellness app every morning and posts a quick update to her audience before starting her college day."
  };


  /*
  
    const persona = {
      "name": "Alex Rivera",
      "title": "Freelance Graphic Designer",
      "type": "Empathy",
      "location": "Portland, OR",
      "archetype": "The Balancing Act",
      "status": "Living with roommate • Part-time worker",
      "background": [
        "Raised in a bilingual household",
        "Moved from Texas to Portland for design opportunities",
        "Enjoys nature and practices mindful journaling"
      ],
      "behaviorTags": [
        "Journals emotions daily",
        "Uses social media to inspire others",
        "Prefers face-to-face over text communication",
        "Shops based on emotional connection to brand"
      ],
      "personality": {
        "Introvert": 75,
        "Intuition": 68,
        "Feeling": 90,
        "Perceiving": 65
      },
      "painPoints": [
        "Feels overwhelmed by too many choices",
        "Struggles with client feedback emotionally",
        "Has difficulty balancing personal and client needs"
      ],
      "motivations": {
        "Empathy": 95,
        "Creativity": 80,
        "Connection": 85,
        "Freedom": 70
      },
      "scenario": [
        "Alex browses community forums in the morning to feel emotionally connected.",
        "She updates her moodboard while sipping tea and reflecting on yesterday's work.",
        "Before starting client tasks, she meditates for 5 minutes to set emotional tone."
      ]
    }*/

  /*
    const persona = {
      "name": "Alex Rivera",
      "title": "Marketing Manager",
      "type": "Agile",
      "location": "Remote, originally from Austin, TX",
      "generation": "Millennial / 32 years",
      "status": "Overwhelmed but adaptive",
      "income": "$85,000/year",
      "goals": [
        "Streamline workflows to reduce context-switching fatigue",
        "Maintain brand consistency across 5+ platforms",
        "Stay ahead of emerging trends without deep dives",
        "Avoid burnout while meeting quarterly KPIs"
      ],
      "painPoints": [
        "Fragmented tools create duplicate work (e.g., manual data entry between CRM and analytics)",
        "Creativity stifled by 'good enough' templates that don't reflect brand voice",
        "Decision fatigue from choosing between 10+ analytics platforms",
        "Fear of adopting new tools that require retraining teams"
      ],
      "favouriteBrands": [
        "Slack (for urgent comms)",
        "Trello (overloaded with half-finished boards)",
        "Google Analytics (used only for basic reports)",
        "Canva (for quick edits, but resists advanced features)",
        "Zoom (with unused breakout room features)"
      ]
    }
  
  
  

  const persona = {
    "name": "Alex Rivera",
    "title": "Freelance Content Creator",
    "type": "JTBD",
    "location": "Austin, TX",
    "archetype": "The Juggler",
    "goals": [
      "I need to prioritize tasks to meet multiple client deadlines without burning out.",
      "I want to maintain creative quality while adhering to client constraints.",
      "I need a way to track time effectively to invoice accurately but without micromanaging."
    ],
    "scenario": [
      "Struggling to say 'no' to new projects, leading to overcommitment.",
      "Spending hours refining a project detail because it 'feels right,' then missing the deadline.",
      "Avoiding client calls to dodge potential scope changes but then facing dissatisfaction later."
    ],
    "motivations": {
      "Autonomy": 95,
      "Efficiency": 85,
      "Creativity": 92,
      "Social_validation": 75,
      "Financial_stability": 80
    },
    "favouriteBrands": [
      "Trello",
      "Adobe Creative Cloud",
      "Slack",
      "RescueTime (used inconsistently)",
      "Avoids Asana due to perceived complexity"
    ]

    
;


  switch (persona.type) {
    case "Classic":
      await renderClassicPersona(persona);
      figma.closePlugin("Success: Classic Persona rendered");
      break;
    case "Agile":
      await renderAgilePersona(persona);
      figma.closePlugin("Success: Agile Persona rendered");
      break;
    case "JTBD":
      await renderJtbdPersona(persona);
      figma.closePlugin("Success: JTBD Persona rendered");
      break;
    case "Empathy":
      await renderEmpathyPersona(persona);
      figma.closePlugin("Success: Empathy Persona rendered");
      break;
    default:
      figma.closePlugin("Error: Unknown persona type");
  }
})();*/
```

## 📄 Code in `figma plugin\manifest.json`
```code
{
  "name": "Persona Renderer",
  "id": "com.openuxlab.persona.renderer",
  "api": "1.0.0",
  "main": "code.js",
  "ui": "ui.html",
  "editorType": ["figma"]
}
```

## 📄 Code in `figma plugin\ui.html`
```code
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 1rem; }
    input { width: 100%; padding: 0.5rem; margin-top: 0.5rem; }
    button { margin-top: 1rem; padding: 0.5rem 1rem; }
  </style>
</head>
<body>
  <h3><svg xmlns="http://www.w3.org/2000/svg" class="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7.5 15.5a3.5 3.5 0 0 1 4.5-4.5h1a3.5 3.5 0 1 1 0 7H12a3.5 3.5 0 0 1-4.5-2.5z"/><circle cx="8.5" cy="10.5" r="1"/><circle cx="15.5" cy="10.5" r="1"/></svg> Paste Design Token</h3>
  <input id="tokenInput" placeholder="Enter token here..." />
  <button id="renderBtn">Render Design</button>

  <script>
    document.getElementById('renderBtn').onclick = async () => {
      const token = document.getElementById('tokenInput').value.trim();
      if (!token) return alert("Please enter a token.");

      try {
        const res = await fetch(`http://localhost:8000/api/export/public/persona/${token}`);
        if (!res.ok) throw new Error("Invalid token or persona not found");

        const persona = await res.json();
        parent.postMessage({
          pluginMessage: {
            type: 'render-json',
            payload: persona
          }
        }, '*');
      } catch (err) {
        alert("Error: Failed to fetch design. Check the token and try again.");
      }
    };
  </script>
</body>
</html>
```

## 📄 Code in `frontend\.env.local`
```code
REACT_APP_SUPABASE_URL=https://quqpyfigtzkgwgzccaex.supabase.co
REACT_APP_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cXB5ZmlndHprZ3dnemNjYWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMTY3MTEsImV4cCI6MjA2NDU5MjcxMX0.thym0-EA3bJJuzgisRcpxVNxY8ZM_OvzvtDVFN8Q94M
```

## 📄 Code in `frontend\.gitignore`
```code
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/public
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env
```

## 📄 Code in `frontend\components.json`
```code
{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "",
      "css": "src/styles/globals.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    },
    "iconLibrary": "lucide"
  }
```

## 📄 Code in `frontend\package.json`
```code
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@radix-ui/themes": "^3.2.1",
    "@supabase/supabase-js": "^2.49.9",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.10.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "country-list": "^2.3.0",
    "geoip-lite": "^1.4.10",
    "html-to-image": "^1.11.13",
    "jspdf": "^3.0.1",
    "lucide-react": "^0.514.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.2",
    "react-scripts": "5.0.1",
    "tailwind-merge": "^3.3.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.4",
    "tailwindcss": "^3.4.1"
  }
}
```

## 📄 Code in `frontend\postcss.config.js`
```code
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 📄 Code in `frontend\tailwind.config.js`
```code
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'canvas-repeat': "url('13972.png')"
      },
      backgroundRepeat: {
        'repeat': 'repeat',
      },
    },
  },
  plugins: [],
}
```

## 📄 Code in `frontend\src\13972.jpg`
⚠️ Error reading file: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte

## 📄 Code in `frontend\src\13972.png`
⚠️ Error reading file: 'utf-8' codec can't decode byte 0x89 in position 0: invalid start byte

## 📄 Code in `frontend\src\App.css`
```code
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## 📄 Code in `frontend\src\App.js`
```code
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import PersonaBuilder from "./components/persona/PersonaBuilder";
import PersonaDashboard from "./components/persona/PersonaDashboard";
import PersonaViewer from "./components/persona/PersonaViewer";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { session } = useAuth();
  return session ? children : <Navigate to="/builder" />;
}

function App() {
  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      <Router>
        <HeaderBar />
        <Routes>
          <Route path="/builder" element={<PersonaBuilder />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PersonaDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/persona/:id"
            element={
              <PrivateRoute>
                <PersonaBuilder />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/builder" />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
```

## 📄 Code in `frontend\src\App.test.js`
```code
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

## 📄 Code in `frontend\src\index.css`
```code
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.custom-scrollbar {
  scrollbar-width:thin;
  scrollbar-color: #c4b5fd #fff;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c4b5fd;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #fff;
}
```

## 📄 Code in `frontend\src\index.js`
```code
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

## 📄 Code in `frontend\src\logo.svg`
```code
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/><circle cx="420.9" cy="296.5" r="45.7"/><path d="M520.5 78.1z"/></g></svg>
```

## 📄 Code in `frontend\src\persona.jpg`
⚠️ Error reading file: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte

## 📄 Code in `frontend\src\persona.pdf`
⚠️ Error reading file: 'utf-8' codec can't decode byte 0xba in position 10: invalid start byte

## 📄 Code in `frontend\src\reportWebVitals.js`
```code
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
```

## 📄 Code in `frontend\src\setupTests.js`
```code
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
```

## 📄 Code in `frontend\src\components\HeaderBar.jsx`
```code
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Rocket } from "lucide-react";

export default function HeaderBar() {
  const { user, signIn, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isBuilder = location.pathname === "/builder";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header
      className="fixed left-1/2 transform -translate-x-1/2 py-3 px-6 text-sm flex justify-between items-center z-50 w-full max-w-[1200px] md:max-w-[900px] sm:max-w-full border border-purple-200 bg-white"
      style={{ top: "20px", borderRadius: "40px", color: "#333333", boxShadow: "0 2px 12px 0 rgba(80, 0, 120, 0.07)" }}
    >
      <span className="font-semibold text-lg"><Rocket className="inline w-5 h-5 mr-1 align-text-bottom text-purple-600" /> Open UX Lab</span>
      <div className="flex gap-4 items-center">
        {!isBuilder && !isDashboard && (
          <Button className="bg-purple-600 px-3 py-1 rounded" onClick={() => navigate('/builder')}>
          Generate Persona
        </Button>
        )}
        {isDashboard && (
          <Button className="bg-purple-600 px-3 py-1 rounded" onClick={() => navigate('/builder')}>
            Generate Persona
          </Button>
        )}
        {user && !isDashboard ? (
          <Button className="bg-purple-600 px-3 py-1 rounded" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        ) : null}
        {user ? (
          <>
            <span className="text-xs">Hi, {(() => {
              const name = user.user_metadata?.full_name;
              if (name) return name.split(' ')[0];
              if (user.email) return user.email.split('@')[0];
              return '';
            })()}</span>
            <button onClick={signOut} className="bg-white text-purple-700 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <button onClick={signIn} className="bg-white text-purple-700 px-3 py-1 rounded">
            Log in with Google
          </button>
        )}
      </div>
    </header>
  );
}
```

## 📄 Code in `frontend\src\components\WelcomeCard.jsx`
```code
import { Card, CardContent } from "../components/ui/card"

function WelcomeCard() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-xl font-bold">👋 Welcome to Agentic UX</h1>
          <p className="text-sm mt-2 text-gray-600">
            Start by creating your first UX project and talk to the AI agent.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default WelcomeCard
```

## 📄 Code in `frontend\src\components\persona\ColorThemeSelector.jsx`
```code
import React, { useState, useRef, useEffect } from "react";

const COLOR_THEMES = [
  { key: "purple", label: "Purple", colors: ["#a259e6", "#7c3aed"] },
  { key: "blue", label: "Blue", colors: ["#3b82f6", "#2563eb"] },
  { key: "green", label: "Green", colors: ["#22c55e", "#16a34a"] },
  { key: "orange", label: "Orange", colors: ["#fb923c", "#f97316"] },
  { key: "pink", label: "Pink", colors: ["#ec4899", "#db2777"] },
  { key: "indigo", label: "Indigo", colors: ["#6366f1", "#4f46e5"] },
  { key: "red", label: "Red", colors: ["#ef4444", "#dc2626"] },
  { key: "teal", label: "Teal", colors: ["#14b8a6", "#0d9488"] },
];

export default function ColorThemeSelector({ value = "purple", onChange }) {
  const [expanded, setExpanded] = useState(false);
  const currentTheme = COLOR_THEMES.find(t => t.key === value) || COLOR_THEMES[0];
  const cardRef = useRef(null);
  const popupRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState({});

  // Position the popup absolutely below the card
  useEffect(() => {
    if (expanded && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPopupStyle({
        position: 'absolute',
        left: rect.left + window.scrollX,
        top: rect.bottom + 8 + window.scrollY, // 8px gap
        zIndex: 1000,
        minWidth: rect.width,
      });
    }
  }, [expanded]);

  // Close popup on outside click
  useEffect(() => {
    if (!expanded) return;
    function handleClick(e) {
      if (
        cardRef.current && !cardRef.current.contains(e.target) &&
        popupRef.current && !popupRef.current.contains(e.target)
      ) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expanded]);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow px-5 py-2 cursor-pointer select-none transition border border-gray-100 hover:shadow-lg relative"
        onClick={() => setExpanded((prev) => !prev)}
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
        style={{ userSelect: 'none' }}
        ref={cardRef}
      >
        <div className="flex items-center mb-1 gap-2">
          <span className="inline-block bg-purple-100 p-2 rounded-full">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z" fill="#a259e6"/></svg>
          </span>
          <div className="flex-1">
            <div className="font-semibold">Color Theme</div>
            <div className="text-xs text-gray-500">{currentTheme.label}</div>
          </div>
          <span className={`transition-transform ml-2 ${expanded ? 'rotate-90' : ''}`}>
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </div>
      {expanded && (
        <div
          ref={popupRef}
          style={popupStyle}
          className="bg-white rounded-xl shadow-2xl border border-gray-200 p-5 mt-0 absolute animate-fade-in"
        >
          <div className="grid grid-cols-4 gap-3 mb-4 mt-1">
            {COLOR_THEMES.map((theme) => (
              <button
                key={theme.key}
                type="button"
                className={`flex flex-col items-center border rounded-lg p-2 transition focus:outline-none ${
                  value === theme.key ? "border-purple-600 shadow-lg" : "border-gray-200"
                }`}
                onClick={e => { e.stopPropagation(); onChange && onChange(theme.key); }}
                aria-label={theme.label}
              >
                <span className="flex w-4 h-4 rounded-full overflow-hidden mb-1">
                  <span style={{ background: theme.colors[0], flex: 1 }} />
                  <span style={{ background: theme.colors[1], flex: 1 }} />
                </span>
                <span className="text-xs font-medium text-gray-700">{theme.label}</span>
              </button>
            ))}
          </div>
          <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 flex items-center gap-2">
            <span>Current theme:</span>
            <span className="font-semibold text-gray-800 capitalize">{currentTheme.label}</span>
          </div>
        </div>
      )}
    </>
  );
}
```

## 📄 Code in `frontend\src\components\persona\CustomPrompt.jsx`
```code
import { Textarea } from "../ui/textarea"

export default function CustomPrompt() {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium block mb-1">Add Custom Prompt</label>
      <Textarea className="w-full" placeholder="Write any extra details for the AI agent..." />
    </div>
  )
}
```

## 📄 Code in `frontend\src\components\persona\FileUpload.jsx`
```code
import { Input } from "../ui/input"

export default function FileUpload() {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium block mb-1">Upload Research Data</label>
      <Input type="file" className="w-full" />
    </div>
  )
}
```

## 📄 Code in `frontend\src\components\persona\PersonaBuilder.jsx`
```code
import { useState, useEffect, useRef } from "react";
import PersonaForm from "./PersonaForm";
import PersonaPreview from "./PersonaPreview";
import { generatePersona, pollPersonaStatus, updatePersonaTheme } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Accordion, AccordionItem } from "../ui/accordion";
import { Select } from "../ui/select";
import { Switch } from "../ui/switch";
import logo from "../../logo.svg";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { copyToFigmaClipboard, generateFigmeta, encodeFigmeta } from '../../lib/figmaExport';
import { Palette, FileText, FileImage, Figma } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../ui/alert-dialog";
import ColorThemeSelector from "./ColorThemeSelector";

const socialOptions = [
  { value: "linkedin", label: "LinkedIn (4:5, Recommended)" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
];

export default function PersonaBuilder() {
  const [loading, setLoading] = useState(false);
  const [personaData, setPersonaData] = useState(null);
  const [showGoals, setShowGoals] = useState(true);
  const [showBackground, setShowBackground] = useState(true);
  const [showPainPoints, setShowPainPoints] = useState(true);
  const [showIdentity, setShowIdentity] = useState(true);
  const [social, setSocial] = useState(socialOptions[0].value);
  const [colorPalette, setColorPalette] = useState(true);
  const [typography, setTypography] = useState(true);
  const [backgroundDesign, setBackgroundDesign] = useState(true);
  const [slidesCounter, setSlidesCounter] = useState(true);
  const [identityBrand, setIdentityBrand] = useState(true);
  const { session } = useAuth();
  const pollingRef = useRef();
  const navigate = useNavigate();
  const { id: personaId } = useParams();
  const exportRef = useRef();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [colorTheme, setColorTheme] = useState(null);

  const handleGenerate = async (formData) => {
    if (!formData) return;
    if (!session) {
      setAlertTitle("Login Required");
      setAlertDescription("You must be logged in to generate a persona. Please log in and try again.");
      setAlertOpen(true);
      return;
    }
    try {
      setLoading(true);
      const result = await generatePersona(formData, session?.access_token);
      setPersonaData(result);
      if (result.id) {
        startPolling(result.id);
      }
    } catch (error) {
      let message = error?.message || "";
      let backendMsg = message.replace(/^Persona generation failed:/, "").trim();
      if (
        message.includes("401") ||
        message.toLowerCase().includes("unauthorized") ||
        message.includes("403") ||
        backendMsg.includes("Missing token")
      ) {
        setAlertTitle("Login Required");
        setAlertDescription("You must be logged in to generate a persona. Please log in and try again.");
      } else {
        setAlertTitle("Persona Generation Failed");
        setAlertDescription(backendMsg || "Something went wrong. Please try again.");
      }
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = (id) => {
    clearInterval(pollingRef.current);
    pollingRef.current = setInterval(async () => {
      try {
        const updated = await pollPersonaStatus(id);
        if (updated.profile_image_url) {
          setPersonaData((prev) => ({ ...prev, profile_image_url: updated.profile_image_url }));
          clearInterval(pollingRef.current);
        }
      } catch (e) {}
    }, 2000);
  };

  useEffect(() => {
    if (personaId) {
      // If there's an id in the URL, load the persona
      (async () => {
        setLoading(true);
        try {
          const data = await pollPersonaStatus(personaId);
          setPersonaData({ ...data.persona_json, ...data });
        } catch (err) {
          setPersonaData(null);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setPersonaData(null);
    }
    return () => {
      clearInterval(pollingRef.current);
    };
  }, [personaId]);

  // When personaData changes, update colorTheme from personaData.theme (if present)
  useEffect(() => {
    if (personaData && personaData.theme) {
      setColorTheme(personaData.theme);
    } else if (personaData) {
      setColorTheme('purple');
    }
  }, [personaData]);

  // Persona card element toggles
  const cardToggles = {
    showGoals,
    showBackground,
    showPainPoints,
    showIdentity,
  };

  // Export handlers
  const handleExportSVG = async () => {
    if (!exportRef.current) return;
    const dataUrl = await htmlToImage.toSvg(exportRef.current);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'persona.svg';
    link.click();
  };

  const handleExportJPG = async () => {
    if (!exportRef.current) return;
    const dataUrl = await htmlToImage.toJpeg(exportRef.current, { quality: 0.95 });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'persona.jpg';
    link.click();
  };

  const handleExportPDF = async () => {
    if (!exportRef.current) return;
    const { width, height } = exportRef.current.getBoundingClientRect();
    const dataUrl = await htmlToImage.toPng(exportRef.current, { width, height });
    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height]
    });
    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
    pdf.save('persona.pdf');
  };

  // Color theme change handler
  const handleThemeChange = async (newTheme) => {
    setColorTheme(newTheme);
    if (personaData && personaData.id && session?.access_token) {
      try {
        const updated = await updatePersonaTheme(personaData.id, newTheme, session.access_token);
        setPersonaData((prev) => ({ ...prev, ...updated }));
        setColorTheme(updated.theme || newTheme);
      } catch (err) {
        // Optionally show error to user
        console.error('Failed to update theme:', err);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Alert Dialog for errors */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)} autoFocus>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Sidebar */}
      <aside className="w-full md:w-80 p-4 bg-white flex flex-col gap-6 h-screen overflow-y-auto border border-purple-200 custom-scrollbar"
        style={{ boxShadow: "0 2px 12px 0 rgba(80, 0, 120, 0.07)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg text-purple-700">AI Persona Generator</span>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center flex-1 mt-20">
            <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mb-6"></div>
            <div className="text-purple-700 font-semibold text-lg mb-1">We are working on your persona...</div>
            <div className="text-gray-500 text-sm text-center">This may take a few moments. Please wait!</div>
          </div>
        ) : personaData ? (
          <>
            {/* Color Theme Selector - only visible after persona is generated */}
            <ColorThemeSelector value={colorTheme || 'purple'} onChange={handleThemeChange} />
            <div className="bg-white rounded-xl shadow px-5 py-5 w-full max-w-xs">
              <div className="space-y-4">
                {/* PDF Export */}
                <div className="border rounded-lg px-3 py-3 flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl"><FileText strokeWidth={1.5}  className="inline w-6 h-6 align-text-bottom" /></span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">PDF Export</span>
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">Popular</span>
                      </div>
                      <div className="text-xs text-gray-500">Print-ready format for sharing and presentations</div>
                    </div>
                  </div>
                  <button onClick={handleExportPDF} className="mt-4 mx-auto bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-6 py-2 rounded border border-purple-200 w-full">Export</button>
                </div>
                {/* Figma Plugin */}
                <div className="border rounded-lg px-3 py-3 flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl"><Figma strokeWidth={1.5} className="inline w-6 h-6 align-text-bottom" /></span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium flex items-center gap-1">Figma Plugin</span>
                        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded">Design</span>
                      </div>
                      <div className="text-xs text-gray-500">Click Export and paste the token into the Figma plugin</div>
                    </div>
                  </div>
                  {personaData.design_token && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(personaData.design_token);
                        alert('Token copied! Paste it into the Figma plugin.');
                      }}
                      className="mt-4 mx-auto bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-6 py-2 rounded border border-purple-200 w-full"
                    >
                      Export
                    </button>
                  )}
                </div>
                {/* JPG Export */}
                <div className="border rounded-lg px-3 py-3 flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl"><FileImage  strokeWidth={1.5} className="inline w-6 h-6 align-text-bottom" /></span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">JPG Image</span>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">Try Now</span>
                      </div>
                      <div className="text-xs text-gray-500">High quality image for web and print</div>
                    </div>
                  </div>
                  <button onClick={handleExportJPG} className="mt-4 mx-auto bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-6 py-2 rounded border border-purple-200 w-full">Export</button>
                </div>
                <button
                  className="w-full mt-6 bg-purple-600 text-white px-4 py-2 rounded font-bold hover:bg-purple-700 transition"
                  onClick={() => {
                    setPersonaData(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  + Create Another Persona
                </button>
              </div>
            </div>
          </>
        ) : (
          <PersonaForm onGenerate={handleGenerate} loading={loading} />
        )}
      </aside>
      {/* Main Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto bg-canvas-repeat bg-repeat">
        <div className="flex flex-col items-center justify-center w-full max-w-xl">
          <PersonaPreview ref={exportRef} persona={personaData} loading={loading} cardToggles={cardToggles} colorTheme={colorTheme} />
          
        </div>
      </main>
    </div>
  );
}
```

## 📄 Code in `frontend\src\components\persona\PersonaCard.jsx`
```code
import PersonaCardClassic from "./PersonaCardClassic"
import PersonaCardAgile from "./PersonaCardAgile"
import PersonaCardJTBD from "./PersonaCardJTBD"
import PersonaCardEmpathy from "./PersonaCardEmpathy"
import React from "react";

const PersonaCard = React.forwardRef(function PersonaCard({ data, colorTheme }, ref) {
  if (!data || !data.type) return null

  switch (data.type) {
    case "Classic":
      return <PersonaCardClassic data={data} ref={ref} colorTheme={colorTheme} />
    case "Agile":
      return <PersonaCardAgile data={data} ref={ref} colorTheme={colorTheme} />
    case "JTBD":
      return <PersonaCardJTBD data={data} ref={ref} colorTheme={colorTheme} />
    case "Empathy":
      return <PersonaCardEmpathy data={data} ref={ref} colorTheme={colorTheme} />
    default:
      return <p className="text-red-500">Unknown persona type</p>
  }
});

export default PersonaCard;
```

## 📄 Code in `frontend\src\components\persona\PersonaCardAgile.jsx`
```code
import React from "react";

const COLOR_MAP = {
  purple: {
    bgLight: "bg-purple-50",
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    tagBg: "bg-purple-100",
    tagText: "text-purple-800",
    bar: "bg-purple-600",
    barBg: "bg-purple-100",
  },
  blue: {
    bgLight: "bg-blue-50",
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    tagBg: "bg-blue-100",
    tagText: "text-blue-800",
    bar: "bg-blue-600",
    barBg: "bg-blue-100",
  },
  green: {
    bgLight: "bg-green-50",
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    tagBg: "bg-green-100",
    tagText: "text-green-800",
    bar: "bg-green-600",
    barBg: "bg-green-100",
  },
  orange: {
    bgLight: "bg-orange-50",
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    tagBg: "bg-orange-100",
    tagText: "text-orange-800",
    bar: "bg-orange-600",
    barBg: "bg-orange-100",
  },
  pink: {
    bgLight: "bg-pink-50",
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-200",
    tagBg: "bg-pink-100",
    tagText: "text-pink-800",
    bar: "bg-pink-600",
    barBg: "bg-pink-100",
  },
  indigo: {
    bgLight: "bg-indigo-50",
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    tagBg: "bg-indigo-100",
    tagText: "text-indigo-800",
    bar: "bg-indigo-600",
    barBg: "bg-indigo-100",
  },
  red: {
    bgLight: "bg-red-50",
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
    tagBg: "bg-red-100",
    tagText: "text-red-800",
    bar: "bg-red-600",
    barBg: "bg-red-100",
  },
  teal: {
    bgLight: "bg-teal-50",
    bg: "bg-teal-100",
    text: "text-teal-600",
    border: "border-teal-200",
    tagBg: "bg-teal-100",
    tagText: "text-teal-800",
    bar: "bg-teal-600",
    barBg: "bg-teal-100",
  },
};

export default React.forwardRef(function PersonaCardAgile({ data, colorTheme = "blue" }, ref) {
  const theme = COLOR_MAP[colorTheme] || COLOR_MAP.blue;
  const { name, role, location, status, archetype, goals, painPoints, motivations, tools, profile_image, profile_image_url } = data;

  const renderBar = (value) => (
    <div className={`w-full h-2 ${theme.barBg} rounded`}>
      <div className={`h-full ${theme.bar} rounded`} style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div ref={ref} className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] text-[15px] text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start">
        {/* Column 1 - Avatar + Bio */}
        <div className={`flex flex-col items-center text-center gap-12 ${theme.bgLight} p-6 rounded-xl`}>
          {profile_image_url ? (
            <img
              src={profile_image_url}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : profile_image ? (
            <img
              src={`data:image/png;base64,${profile_image}`}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : (
            <div className={`w-[254px] h-[254px] ${theme.bg} rounded-full border-[6px] border-white`} />
          )}
          <div>
            <h2 className="text-[26px] font-bold">{name}</h2>
            <p className={`${theme.text} font-semibold mt-3`}>{role}</p>
          </div>
          <div className={`${theme.bg} p-4 rounded-xl w-full text-left space-y-1`}>
            {location && <p><strong>Location</strong>: {location}</p>}
            {status && <p><strong>Status</strong>: {status}</p>}
            {archetype && <p><strong>Archetype</strong>: {archetype}</p>}
          </div>
        </div>

        {/* Column 2 - Goals + Pain Points */}
        <div className="flex flex-col gap-6 h-full">
          {goals?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="text-[17px] font-semibold mb-1">Goals</h3>
              <ul className="list-disc list-outside pl-4">
                {goals.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
          {painPoints?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl flex-1`}>
              <h3 className="text-[17px] font-semibold mb-1">Pain Points</h3>
              <ul className="list-disc list-outside pl-4">
                {painPoints.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Column 3 - Motivation + Brands */}
        <div className="flex flex-col gap-6 h-full">
          {motivations && Object.keys(motivations).length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="text-[17px] font-semibold mb-1">Motivation</h3>
              <div className="space-y-2">
                {Object.entries(motivations).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tools?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl flex-1`}>
              <h3 className="text-[17px] font-semibold mb-2">Favourite Brands</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <span key={i} className={`${theme.tagBg} ${theme.tagText} text-xs px-3 py-1 rounded-full`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
```

## 📄 Code in `frontend\src\components\persona\PersonaCardClassic.jsx`
```code
import React from "react";

const COLOR_MAP = {
  purple: {
    bgLight: "bg-purple-50",
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    tagBg: "bg-purple-100",
    tagText: "text-purple-800",
    bar: "bg-purple-600",
    barBg: "bg-purple-100",
  },
  blue: {
    bgLight: "bg-blue-50",
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    tagBg: "bg-blue-100",
    tagText: "text-blue-800",
    bar: "bg-blue-600",
    barBg: "bg-blue-100",
  },
  green: {
    bgLight: "bg-green-50",
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    tagBg: "bg-green-100",
    tagText: "text-green-800",
    bar: "bg-green-600",
    barBg: "bg-green-100",
  },
  orange: {
    bgLight: "bg-orange-50",
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    tagBg: "bg-orange-100",
    tagText: "text-orange-800",
    bar: "bg-orange-600",
    barBg: "bg-orange-100",
  },
  pink: {
    bgLight: "bg-pink-50",
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-200",
    tagBg: "bg-pink-100",
    tagText: "text-pink-800",
    bar: "bg-pink-600",
    barBg: "bg-pink-100",
  },
  indigo: {
    bgLight: "bg-indigo-50",
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    tagBg: "bg-indigo-100",
    tagText: "text-indigo-800",
    bar: "bg-indigo-600",
    barBg: "bg-indigo-100",
  },
  red: {
    bgLight: "bg-red-50",
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
    tagBg: "bg-red-100",
    tagText: "text-red-800",
    bar: "bg-red-600",
    barBg: "bg-red-100",
  },
  teal: {
    bgLight: "bg-teal-50",
    bg: "bg-teal-100",
    text: "text-teal-600",
    border: "border-teal-200",
    tagBg: "bg-teal-100",
    tagText: "text-teal-800",
    bar: "bg-teal-600",
    barBg: "bg-teal-100",
  },
};

export default React.forwardRef(function PersonaCardClassic({ data, colorTheme = "purple" }, ref) {
  const theme = COLOR_MAP[colorTheme] || COLOR_MAP.purple;
  const { name, title, location, generation, status, income, archetype, background, personality, behaviorTags, goals, painPoints, motivations, tools, profile_image, profile_image_url } = data;

  const renderBar = (value) => (
    <div className={`w-full h-2 ${theme.barBg} rounded`}>
      <div className={`h-full ${theme.bar} rounded`} style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div ref={ref} className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] text-sm text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px]">
        {/* Column 1 - Avatar & Info */}
        <div className={`flex flex-col items-center text-center gap-12 ${theme.bgLight} p-6 rounded-xl`}>
          {/* Avatar/Profile Image */}
          {profile_image_url ? (
            <img
              src={profile_image_url}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : profile_image ? (
            <img
              src={`data:image/png;base64,${profile_image}`}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : (
            <div className="w-[254px] h-[254px] rounded-full bg-gray-100 border-[6px] border-white" />
          )}

          {/* Name + Role */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <p className={`${theme.text} font-semibold mt-3`}>{title}</p>
          </div>

          {/* Basic Info */}
          <div className={`${theme.bg} p-4 rounded-xl w-full text-left text-sm space-y-1`}>
            {location && <p><strong>Location</strong>: {location}</p>}
            {generation && <p><strong>Generation/Age</strong>: {generation}</p>}
            {status && <p><strong>Status/Kids</strong>: {status}</p>}
            {income && <p><strong>Income</strong>: {income}</p>}
          </div>
        </div>

        {/* Column 2 - Background, Personality, Behavior Tags, Pain Points */}
        <div className="flex flex-col gap-6">
          {background?.length > 0 && (
            <div className={`${theme.bgLight} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Background</h3>
              <ul className="list-disc list-outside pl-4">
                {background.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {personality && Object.keys(personality).length > 0 && (
            <div className={`${theme.bgLight} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Personality</h3>
              <div className="space-y-2">
                {Object.entries(personality).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {behaviorTags?.length > 0 && (
            <div className={`${theme.bgLight} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-2">Behavior Tags</h3>
              <div className="flex flex-wrap gap-2">
                {behaviorTags.map((tag, i) => (
                  <span key={i} className={`${theme.tagBg} ${theme.tagText} text-xs px-3 py-1 rounded-full`}>{tag}</span>
                ))}
              </div>
            </div>
          )}

          {painPoints?.length > 0 && (
            <div className={`${theme.bgLight} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Pain Points</h3>
              <ul className="list-disc list-outside pl-4">
                {painPoints.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Column 3 - Motivation, Goals, Favourite Brands */}
        <div className="flex flex-col gap-6">
          {motivations && Object.keys(motivations).length > 0 && (
            <div className={`${theme.bgLight} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Motivation</h3>
              <div className="space-y-2">
                {Object.entries(motivations).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {goals?.length > 0 && (
            <div className={`${theme.bgLight} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Goals</h3>
              <ul className="list-disc list-outside pl-4">
                {goals.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {/* Favourite Brands */}
          <div className={`${theme.bgLight} p-4 rounded-xl flex flex-col flex-1`}>
            <h3 className="font-semibold mb-2">Favourite Brands</h3>
            <div className="flex gap-4 items-center flex-wrap">
              {tools.map((tool, i) => (
                <span key={i} className="bg-white border px-4 py-2 rounded-lg shadow text-xs">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
```

## 📄 Code in `frontend\src\components\persona\PersonaCardEmpathy.jsx`
```code
import React from "react";

const COLOR_MAP = {
  purple: {
    bgLight: "bg-purple-50",
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    tagBg: "bg-purple-100",
    tagText: "text-purple-800",
    bar: "bg-purple-600",
    barBg: "bg-purple-100",
  },
  blue: {
    bgLight: "bg-blue-50",
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    tagBg: "bg-blue-100",
    tagText: "text-blue-800",
    bar: "bg-blue-600",
    barBg: "bg-blue-100",
  },
  green: {
    bgLight: "bg-green-50",
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    tagBg: "bg-green-100",
    tagText: "text-green-800",
    bar: "bg-green-600",
    barBg: "bg-green-100",
  },
  orange: {
    bgLight: "bg-orange-50",
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    tagBg: "bg-orange-100",
    tagText: "text-orange-800",
    bar: "bg-orange-600",
    barBg: "bg-orange-100",
  },
  pink: {
    bgLight: "bg-pink-50",
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-200",
    tagBg: "bg-pink-100",
    tagText: "text-pink-800",
    bar: "bg-pink-600",
    barBg: "bg-pink-100",
  },
  indigo: {
    bgLight: "bg-indigo-50",
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    tagBg: "bg-indigo-100",
    tagText: "text-indigo-800",
    bar: "bg-indigo-600",
    barBg: "bg-indigo-100",
  },
  red: {
    bgLight: "bg-red-50",
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
    tagBg: "bg-red-100",
    tagText: "text-red-800",
    bar: "bg-red-600",
    barBg: "bg-red-100",
  },
  teal: {
    bgLight: "bg-teal-50",
    bg: "bg-teal-100",
    text: "text-teal-600",
    border: "border-teal-200",
    tagBg: "bg-teal-100",
    tagText: "text-teal-800",
    bar: "bg-teal-600",
    barBg: "bg-teal-100",
  },
};

export default React.forwardRef(function PersonaCardEmpathy({ data, colorTheme = "pink" }, ref) {
  const theme = COLOR_MAP[colorTheme] || COLOR_MAP.pink;
  const { name, title, location, generation, status, income, archetype, background, personality, behaviorTags, painPoints, motivations, scenarios, profile_image, profile_image_url } = data;

  const renderBar = (value) => (
    <div className={`w-full h-2 ${theme.barBg} rounded`}>
      <div className={`h-full ${theme.bar} rounded`} style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div ref={ref} className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] text-sm text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start">
        {/* Column 1 - Avatar + Name + Role + Bio */}
        <div className={`flex flex-col items-center text-center gap-12 ${theme.bgLight} p-6 rounded-xl`}>
          {profile_image_url ? (
            <img
              src={profile_image_url}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : profile_image ? (
            <img
              src={`data:image/png;base64,${profile_image}`}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : (
            <div className={`w-[254px] h-[254px] ${theme.bg} rounded-full border-[6px] border-white`} />
          )}
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className={`${theme.text} font-semibold mt-3`}>{title}</p>
          </div>
          <div className={`${theme.bg} p-4 rounded-xl w-full text-left space-y-1`}>
            {location && <p><strong>Location</strong>: {location}</p>}
            {generation && <p><strong>Generation/Age</strong>: {generation}</p>}
            {archetype && <p><strong>Archetype</strong>: {archetype}</p>}
          </div>
        </div>

        {/* Column 2 - Background, Behavior Tags, Personality */}
        <div className="flex flex-col gap-6 h-full">
          {background?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Background</h3>
              <ul className="list-disc list-outside pl-4">
                {background.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {behaviorTags?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-2">Behavior Tags</h3>
              <div className="flex flex-wrap gap-2">
                {behaviorTags.map((tag, i) => (
                  <span key={i} className={`${theme.tagBg} ${theme.tagText} text-xs px-3 py-1 rounded-full`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {personality && Object.keys(personality).length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-2">Personality</h3>
              <div className="space-y-2">
                {Object.entries(personality).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Column 3 - Pain Points, Motivation, Scenarios */}
        <div className="flex flex-col gap-6 h-full">
          {painPoints?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Pain Points</h3>
              <ul className="list-disc list-outside pl-4">
                {painPoints.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {motivations && Object.keys(motivations).length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Motivation</h3>
              <div className="space-y-2">
                {Object.entries(motivations).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {scenarios?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl flex-1`}>
              <h3 className="font-semibold mb-1">Scenario</h3>
              <ul className="list-disc list-outside pl-4">
                {scenarios.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
```

## 📄 Code in `frontend\src\components\persona\PersonaCardJTBD.jsx`
```code
import React from "react";

const COLOR_MAP = {
  purple: {
    bgLight: "bg-purple-50",
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    tagBg: "bg-purple-100",
    tagText: "text-purple-800",
    bar: "bg-purple-600",
    barBg: "bg-purple-100",
  },
  blue: {
    bgLight: "bg-blue-50",
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    tagBg: "bg-blue-100",
    tagText: "text-blue-800",
    bar: "bg-blue-600",
    barBg: "bg-blue-100",
  },
  green: {
    bgLight: "bg-green-50",
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    tagBg: "bg-green-100",
    tagText: "text-green-800",
    bar: "bg-green-600",
    barBg: "bg-green-100",
  },
  orange: {
    bgLight: "bg-orange-50",
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    tagBg: "bg-orange-100",
    tagText: "text-orange-800",
    bar: "bg-orange-600",
    barBg: "bg-orange-100",
  },
  pink: {
    bgLight: "bg-pink-50",
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-200",
    tagBg: "bg-pink-100",
    tagText: "text-pink-800",
    bar: "bg-pink-600",
    barBg: "bg-pink-100",
  },
  indigo: {
    bgLight: "bg-indigo-50",
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    tagBg: "bg-indigo-100",
    tagText: "text-indigo-800",
    bar: "bg-indigo-600",
    barBg: "bg-indigo-100",
  },
  red: {
    bgLight: "bg-red-50",
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
    tagBg: "bg-red-100",
    tagText: "text-red-800",
    bar: "bg-red-600",
    barBg: "bg-red-100",
  },
  teal: {
    bgLight: "bg-teal-50",
    bg: "bg-teal-100",
    text: "text-teal-600",
    border: "border-teal-200",
    tagBg: "bg-teal-100",
    tagText: "text-teal-800",
    bar: "bg-teal-600",
    barBg: "bg-teal-100",
  },
};

export default React.forwardRef(function PersonaCardJTBD({ data, colorTheme = "red" }, ref) {
  const theme = COLOR_MAP[colorTheme] || COLOR_MAP.red;
  const { name, role, location, generation, status, income, archetype, goals_jtbd, motivations, scenarios, tools, profile_image, profile_image_url } = data;

  const renderBar = (value) => (
    <div className={`w-full h-2 ${theme.barBg} rounded`}>
      <div className={`h-full ${theme.bar} rounded`} style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div ref={ref} className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] text-[15px] text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start min-h-[720px]">
        {/* Column 1 - Avatar + Bio */}
        <div className={`flex flex-col items-center text-center gap-12 ${theme.bgLight} p-6 rounded-xl`}>
          {profile_image_url ? (
            <img
              src={profile_image_url}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : profile_image ? (
            <img
              src={`data:image/png;base64,${profile_image}`}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : (
            <div className={`w-[254px] h-[254px] ${theme.bg} rounded-full border-[6px] border-white`} />
          )}
          <div>
            <h2 className="text-[26px] font-bold">{name}</h2>
            <p className={`${theme.text} font-semibold mt-3`}>{role}</p>
          </div>
          <div className={`${theme.bg} p-4 rounded-xl w-full text-left space-y-1`}>
            {location && <p><strong>Location</strong>: {location}</p>}
            {generation && <p><strong>Generation/Age</strong>: {generation}</p>}
            {status && <p><strong>Status/Kids</strong>: {status}</p>}
            {income && <p><strong>Income</strong>: {income}</p>}
            {archetype && <p><strong>Archetype</strong>: {archetype}</p>}
          </div>
        </div>

        {/* Column 2 - Goals + Scenarios */}
        <div className="flex flex-col gap-6 h-full">
          {goals_jtbd?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="text-[17px] font-semibold mb-1">Goals (JTBD)</h3>
              <ul className="list-disc list-outside pl-4">
                {goals_jtbd.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
          {scenarios?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl flex-1`}>
              <h3 className="text-[17px] font-semibold mb-1">Scenarios</h3>
              <ul className="list-disc list-outside pl-4 ">
                {scenarios.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Column 3 - Motivation + Brands */}
        <div className="flex flex-col gap-6 h-full">
          {motivations && Object.keys(motivations).length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="text-[17px] font-semibold mb-1">Motivation</h3>
              <div className="space-y-2">
                {Object.entries(motivations).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tools?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl flex-1`}>
              <h3 className="text-[17px] font-semibold mb-2">Favourite Brands</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <span key={i} className={`${theme.tagBg} ${theme.tagText} text-xs px-3 py-1 rounded-full`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
```

## 📄 Code in `frontend\src\components\persona\PersonaDashboard.jsx`
```code
import { useEffect, useState } from 'react';
import { listSavedPersonas, deleteSavedPersona } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FileUser, Eye, Trash2 } from "lucide-react";

export default function PersonaDashboard() {
  const [personas, setPersonas] = useState([]);
  const { session } = useAuth();
  const navigate = useNavigate();
  const [moreOpenId, setMoreOpenId] = useState(null);

  const fetchPersonas = async () => {
    if (!session) return;
    try {
      const list = await listSavedPersonas(session.access_token);
      console.log('Dashboard personas JSON:', list);
      setPersonas(list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, [session]);

  const handleDelete = async (id) => {
    await deleteSavedPersona(id, session.access_token);
    fetchPersonas();
  };

  if (!session) {
    return <p className="p-6 text-center">Sign in to view saved personas.</p>;
  }

  if (personas.length === 0) {
    return <p className="p-6 text-center text-gray-500">No personas saved yet.</p>;
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto my-40 flex justify-center">
      <div className="p-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {personas.map((p) => {
          // Prefer title, then role, then type for designation
          const designation = p.title || p.role || p.type || 'Designation';
          return (
            <div key={p.id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center w-full">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow mb-4">
                {p.profile_image_url ? (
                  <img src={p.profile_image_url} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400"><FileUser className="w-10 h-10 text-gray-400" /></div>
                )}
              </div>
              <h3 className="font-bold text-xl text-center mb-1">{p.name}</h3>
              <p className="text-gray-500 text-base text-center mb-4">{designation}</p>
              <div className="flex gap-2 w-full justify-center">
                <button
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center justify-center text-sm font-medium"
                  onClick={() => navigate(`/persona/${p.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button
                  className="bg-gray-100 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center"
                  onClick={() => handleDelete(p.id)}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

## 📄 Code in `frontend\src\components\persona\PersonaForm.jsx`
```code
import { useState, useEffect } from "react"
import TagInput from "./TagInput"
import FileUpload from "./FileUpload"
import CustomPrompt from "./CustomPrompt"
import { Input } from "../ui/input"
import { Select } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Accordion, AccordionItem } from "../ui/accordion"
import { Lightbulb, Zap } from "lucide-react"
import { ProTip } from "../ui/ProTip"
import countryList from 'country-list';
import axios from 'axios';

export default function PersonaForm({ onGenerate, loading }) {
  const [type, setType] = useState("Classic")
  const [project, setProject] = useState("")
  const [role, setRole] = useState("")
  const [context, setContext] = useState("")
  const [location, setLocation] = useState("")
  const [country, setCountry] = useState("")
  const [autoDetecting, setAutoDetecting] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const countryOptions = [
    { value: '', label: 'Select a country' },
    ...countryList.getData().map(c => ({ value: c.name, label: c.name }))
  ];

  useEffect(() => {
    // Auto-detect country on mount
    const detectCountry = async () => {
      try {
        const res = await axios.get('https://ipapi.co/json/');
        if (res.data && res.data.country_name) {
          setCountry(res.data.country_name);
        }
      } catch (e) {
        // Optionally handle error, fallback to empty
        setCountry("");
      }
    };
    detectCountry();
  }, []);

  useEffect(() => {
    if (country) setLocation(country);
  }, [country]);

  const handleAutoDetect = async () => {
    setAutoDetecting(true);
    try {
      // Use a public IP geolocation API
      const res = await axios.get('https://ipapi.co/json/');
      if (res.data && res.data.country_name) {
        setCountry(res.data.country_name);
      }
    } catch (e) {
      // Optionally show error
    } finally {
      setAutoDetecting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate({
      persona_type: type,
      project_name: project,
      target_user_role: role,
      product_context: context,
      location: location
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      
      <ProTip>Start with basic info, then use AI assist to expand each section. You can always edit!</ProTip>

      <Accordion>
        <AccordionItem title="Select Persona Type" defaultOpen>
          <Select
            options={[
              { value: "Classic", label: "Classic" },
              { value: "Agile", label: "Agile" },
              { value: "JTBD", label: "JTBD" },
              { value: "Empathy", label: "Empathy" },
            ]}
            value={type}
            onChange={e => setType(e.target.value)}
            className="mt-1"
          />
        </AccordionItem>
        
      </Accordion>

      <label className="block">
        <span className="text-sm font-medium">Project Name</span>
        <Input
          type="text"
          value={project}
          onChange={e => setProject(e.target.value)}
          placeholder="e.g., QuickEats Food Delivery App"
          className="mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Product Context</span>
        <Textarea
          value={context}
          onChange={e => setContext(e.target.value)}
          placeholder="e.g., Ordering groceries online..."
          className="mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Target User Role</span>
        <Input
          type="text"
          value={role}
          onChange={e => setRole(e.target.value)}
          placeholder="e.g., College student, Working mother"
          className="mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Location</span>
        <div className="flex gap-2 items-center mt-1">
          <Select
            options={countryOptions}
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="flex-1"
          />
        </div>
      </label>
      {/*
      <AccordionItem title="Advanced Options">
        <TagInput label="Behavior Traits" placeholder="e.g., Tech-savvy, Budget-conscious" tagColor="blue" />
        <TagInput label="Pain Points" placeholder="e.g., Slow delivery, Hidden fees" tagColor="red" />
        <TagInput label="Goals" placeholder="e.g., Order in under 2 mins" tagColor="green" />
      </AccordionItem>
      <AccordionItem title="Upload Research Data">
        <FileUpload />
      </AccordionItem>
      <AccordionItem title="Add Custom Prompt">
        <CustomPrompt />
      </AccordionItem>
      */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md"
      >
        {loading ? <><Zap className="inline w-4 h-4 mr-1 text-yellow-500" /> Generating...</> : <><Zap className="inline w-4 h-4 mr-1 text-yellow-500" /> Generate Persona</>}
      </button>
    </form>
  )
}
```

## 📄 Code in `frontend\src\components\persona\PersonaPreview.jsx`
```code
import PersonaCard from "./PersonaCard"
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { FileUser } from "lucide-react";

const PersonaPreview = React.forwardRef(function PersonaPreview({ persona, loading, cardToggles, colorTheme }, ref) {
  const [scale, setScale] = useState(1);


  if (loading) {
    return <p className="text-center text-gray-400">Generating persona...</p>
  }

  if (!persona) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Card className="max-w-xl w-full flex flex-col items-center justify-center p-10 rounded-[20px] shadow-md bg-white/90">
          <div className="mb-4 leading-none"><FileUser  strokeWidth={1} className="w-[90px] h-[90px] text-gray-400" /></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to create a persona</h2>
          <p className="text-base text-gray-500">Fill out the form to generate your user persona.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="mt-[160px]" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      <PersonaCard data={persona} cardToggles={cardToggles} ref={ref} colorTheme={colorTheme} />
    </div>
  )
});

export default PersonaPreview;
```

## 📄 Code in `frontend\src\components\persona\PersonaViewer.jsx`
```code
import { useEffect, useState, useRef } from 'react';
import PersonaPreview from './PersonaPreview';
import { pollPersonaStatus } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import { useParams, useNavigate } from 'react-router-dom';

export default function PersonaViewer() {
  const { session } = useAuth();
  const [persona, setPersona] = useState(null);
  const [designToken, setDesignToken] = useState(null);
  const exportRef = useRef();
  const { id: personaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (personaId) {
        try {
          const data = await pollPersonaStatus(personaId);
          console.log('pollPersonaStatus API response:', data);
          setPersona({ ...data.persona_json, ...data });
        } catch (err) {
          console.error(err);
        }
      }
    }
    fetchData();
  }, [personaId]);

  const handleExportSVG = async () => {
    if (!exportRef.current) return;
    const dataUrl = await htmlToImage.toSvg(exportRef.current);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'persona.svg';
    link.click();
  };

  const handleExportJPG = async () => {
    if (!exportRef.current) return;
    const dataUrl = await htmlToImage.toJpeg(exportRef.current, { quality: 0.95 });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'persona.jpg';
    link.click();
  };

  const handleExportPDF = async () => {
    if (!exportRef.current) return;
    const { width, height } = exportRef.current.getBoundingClientRect();
    const dataUrl = await htmlToImage.toPng(exportRef.current, { width, height });
    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height]
    });
    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
    pdf.save('persona.pdf');
  };

  return (
    <div className="p-6 bg-canvas-repeat bg-repeat">
      <button onClick={() => navigate('/dashboard')} className="mb-4 bg-gray-200 px-3 py-1 rounded">
        ← Back
      </button>
      {designToken && (
        <button
          className="mb-4 ml-4 bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => {
            navigator.clipboard.writeText(designToken);
            alert('🔗 Design token copied. Paste into Figma plugin to render.');
          }}
        >
          🔗 Copy Token for Figma
        </button>
      )}
      <div className="flex gap-2 mb-4">
        <button onClick={handleExportPDF} className="bg-purple-600 text-white px-3 py-1 rounded">Export as PDF</button>
        <button onClick={handleExportSVG} className="bg-green-600 text-white px-3 py-1 rounded">Export as SVG</button>
        <button onClick={handleExportJPG} className="bg-pink-600 text-white px-3 py-1 rounded">Export as JPG</button>
      </div>
      <PersonaPreview ref={exportRef} persona={persona} loading={!persona} />
    </div>
  );
}
```

## 📄 Code in `frontend\src\components\persona\TagInput.jsx`
```code
import { useState } from "react"
import { Input } from "../ui/input"

export default function TagInput({ label, placeholder, tagColor }) {
  const [tags, setTags] = useState([])
  const [input, setInput] = useState("")

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault()
      setTags([...tags, input.trim()])
      setInput("")
    }
  }

  return (
    <div>
      <label className="text-sm font-medium block mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-1">
        {tags.map((tag, i) => (
          <span key={i} className={`px-2 py-1 rounded-full text-xs bg-${tagColor}-100 text-${tagColor}-700`}>
            {tag}
          </span>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  )
}
```

## 📄 Code in `frontend\src\components\ui\ProTip.jsx`
```code
import { Card } from "./card";
import { Badge } from "./badge";
import { Lightbulb } from "lucide-react";

export function ProTip({ children }) {
  return (
    <Card className="border-l-4 border-yellow-500 bg-yellow-100 p-4 flex items-start gap-3">
      <Lightbulb className="text-yellow-500 mt-1 flex-shrink-0" size={20} strokeWidth={2} />
      <div>
        <Badge
          variant="outline"
          className="text-yellow-900 border-yellow-500 bg-yellow-200 mb-1"
        >
          Pro Tip
        </Badge>
        <p className="text-sm text-gray-900">
          {children}
        </p>
      </div>
    </Card>
  );
}
```

## 📄 Code in `frontend\src\components\ui\accordion.jsx`
```code
import React, { useState } from "react";

export function Accordion({ children }) {
  return <div className="space-y-2">{children}</div>;
}

export function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-md">
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-2 text-left font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-t-md focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{title}</span>
        <span>{open ? "-" : "+"}</span>
      </button>
      {open && <div className="px-4 py-2 bg-white">{children}</div>}
    </div>
  );
}
```

## 📄 Code in `frontend\src\components\ui\alert-dialog.jsx`
```code
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./buttons"

function AlertDialog(props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger(props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal(props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({ className, ...props }) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function AlertDialogFooter({ className, ...props }) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function AlertDialogDescription({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function AlertDialogAction({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), "bg-primary", className)}
      {...props}
    />
  )
}

function AlertDialogCancel({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
```

## 📄 Code in `frontend\src\components\ui\badge.jsx`
```code
import React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2";
  const variants = {
    default: "bg-yellow-100 text-yellow-800 border border-yellow-500",
    outline: "bg-yellow-100 text-yellow-800 border border-yellow-500",
  };
  return (
    <span ref={ref} className={cn(base, variants[variant], className)} {...props} />
  );
});
Badge.displayName = "Badge";

export { Badge };
```

## 📄 Code in `frontend\src\components\ui\button.jsx`
```code
import React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-purple-600 text-purple-600 bg-white hover:bg-purple-50",
    ghost: "bg-transparent text-purple-600 hover:bg-purple-100",
  };
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
  );
});
Button.displayName = "Button"

export { Button }
```

## 📄 Code in `frontend\src\components\ui\buttons.jsx`
```code
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

## 📄 Code in `frontend\src\components\ui\card.jsx`
```code
import React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-white text-black shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardContent }
```

## 📄 Code in `frontend\src\components\ui\input.jsx`
```code
import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
```

## 📄 Code in `frontend\src\components\ui\select.jsx`
```code
import React from "react";

export function Select({ options, value, onChange, className = "" }) {
  return (
    <select
      className={
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 placeholder:text-gray-400 " + className
      }
      value={value}
      onChange={onChange}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
```

## 📄 Code in `frontend\src\components\ui\switch.jsx`
```code
import * as React from "react"

export const Switch = React.forwardRef(({ checked, onChange, className = "", ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange && onChange(!checked)}
      className={
        `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${checked ? 'bg-purple-600' : 'bg-gray-300'} ` + className
      }
      {...props}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  )
})
Switch.displayName = "Switch"
```

## 📄 Code in `frontend\src\components\ui\textarea.jsx`
```code
import React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
```

## 📄 Code in `frontend\src\context\AuthContext.jsx`
```code
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      setSession(data?.session || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setUser(session?.user || null);
      setSession(session);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      window.location.href = 'https://quqpyfigtzkgwgzccaex.supabase.co/auth/v1/authorize?provider=google';
    } catch (err) {
      alert("Unexpected error: " + err.message);
      console.error(err);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

## 📄 Code in `frontend\src\hooks\useAuth.js`
```code
// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, signIn, signOut };
}
```

## 📄 Code in `frontend\src\lib\api.js`
```code
const BASE_URL = "http://localhost:8000/api"

export async function generatePersona(data, token) {
  const headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}/define/persona`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Persona generation failed: ${error}`);
  }

  return await response.json();
}

export async function listSavedPersonas(token) {
  const response = await fetch(`${BASE_URL}/export/persona/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return await response.json()
}

export async function getSavedPersona(id, token) {
  const response = await fetch(`${BASE_URL}/export/persona/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return await response.json()
}

export async function deleteSavedPersona(id, token) {
  const response = await fetch(`${BASE_URL}/export/persona/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return await response.json()
}

export async function pollPersonaStatus(id) {
  const response = await fetch(`${BASE_URL}/define/persona/status/${id}`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}

export async function updatePersonaTheme(personaId, theme, token) {
  const response = await fetch(`${BASE_URL}/export/persona/${personaId}/theme`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ theme }),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}
```

## 📄 Code in `frontend\src\lib\figmaExport.js`
```code
// Step 1: Generate figmeta JSON
export function generateFigmeta({ pasteId = "agentic-ux", fileKey = "UXL123" } = {}) {
  return {
    pasteId,
    fileKey,
    type: "CLIPBOARD_COPY",
    version: "1.0"
  }
}

// Step 2: Encode figmeta safely
export function encodeFigmeta(meta) {
  const json = JSON.stringify(meta)
  return btoa(unescape(encodeURIComponent(json)))
}

// Step 3: Build the clipboard HTML payload

export function buildClipboardHTML(figmetaB64, figmaB64) {
  return `
    <div>
      <span data-metadata="<!--(figmeta)${figmetaB64}(/figmeta)-->"></span>
      <span data-buffer="<!--(figma)${figmaB64}(/figma)-->"></span>
    </div>
  `
}

export async function copyToFigmaClipboard(figmetaB64, figmaB64) {
  const html = buildClipboardHTML(figmetaB64, figmaB64)
  const blob = new Blob([html], { type: "text/html" })
  await navigator.clipboard.write([
    new ClipboardItem({ "text/html": blob })
  ])
  alert("Copied to clipboard! Paste into Figma now.")
}
```

## 📄 Code in `frontend\src\lib\generateClassicScenegraph.js`
```code
export function generateClassicScenegraph(data) {
  return {
    type: "FRAME",
    name: "Classic Persona Card",
    layoutMode: "VERTICAL",
    padding: 24,
    itemSpacing: 16,
    background: "#FFFFFF",
    children: [
      {
        type: "ELLIPSE",
        name: "Avatar",
        size: 120,
        fill: "#FFE0E0",
        stroke: "#FFFFFF",
        strokeWidth: 4
      },
      {
        type: "TEXT",
        name: "Name",
        characters: data.name,
        fontSize: 20,
        fontWeight: "bold",
        fill: "#111827"
      },
      {
        type: "TEXT",
        name: "Title",
        characters: data.title,
        fontSize: 16,
        fill: "#6B7280"
      },
      {
        type: "FRAME",
        name: "Basic Info",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        background: "#FEE2E2",
        padding: 12,
        children: [
          { type: "TEXT", characters: `Location: ${data.location}` },
          { type: "TEXT", characters: `Generation: ${data.generation}` },
          { type: "TEXT", characters: `Status: ${data.status}` },
          { type: "TEXT", characters: `Income: ${data.income}` }
        ]
      },
      {
        type: "FRAME",
        name: "Background",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        children: data.background.map(item => ({
          type: "TEXT",
          characters: `• ${item}`
        }))
      },
      {
        type: "FRAME",
        name: "Goals",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        children: data.goals.map(item => ({
          type: "TEXT",
          characters: `• ${item}`
        }))
      },
      {
        type: "FRAME",
        name: "Pain Points",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        children: data.painPoints.map(item => ({
          type: "TEXT",
          characters: `• ${item}`
        }))
      },
      {
        type: "FRAME",
        name: "Behaviour Tags",
        layoutMode: "HORIZONTAL",
        itemSpacing: 6,
        children: data.behaviorTags.map(tag => ({
          type: "TEXT",
          characters: tag,
          fontSize: 12,
          fill: "#EF4444",
          background: "#FECACA",
          padding: 6,
          cornerRadius: 8
        }))
      },
      {
        type: "FRAME",
        name: "Favourite Brands",
        layoutMode: "HORIZONTAL",
        itemSpacing: 6,
        children: data.tools.map(tool => ({
          type: "TEXT",
          characters: tool,
          fontSize: 12,
          fill: "#374151",
          background: "#E5E7EB",
          padding: 6,
          cornerRadius: 8
        }))
      },
      {
        type: "FRAME",
        name: "Motivations",
        layoutMode: "VERTICAL",
        itemSpacing: 6,
        children: Object.entries(data.motivations).map(([label, value]) => ({
          type: "FRAME",
          layoutMode: "VERTICAL",
          children: [
            { type: "TEXT", characters: label },
            {
              type: "RECTANGLE",
              width: 200,
              height: 8,
              fill: "#10B981",
              widthPercent: value
            }
          ]
        }))
      },
      {
        type: "FRAME",
        name: "Personality",
        layoutMode: "VERTICAL",
        itemSpacing: 6,
        children: Object.entries(data.personality).map(([label, value]) => ({
          type: "FRAME",
          layoutMode: "VERTICAL",
          children: [
            { type: "TEXT", characters: label },
            {
              type: "RECTANGLE",
              width: 200,
              height: 8,
              fill: "#6366F1",
              widthPercent: value
            }
          ]
        }))
      }
    ]
  }
}
```

## 📄 Code in `frontend\src\lib\supabase.js`
```code
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 📄 Code in `frontend\src\lib\utils.js`
```code
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

## 📄 Code in `frontend\src\styles\globals.css`
```code
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```
