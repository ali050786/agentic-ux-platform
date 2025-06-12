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
