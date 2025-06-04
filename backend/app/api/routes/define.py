from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.agents.persona_agent import generate_persona

router = APIRouter()

# ----------- Input Schema ----------- #
class PersonaSeed(BaseModel):
    project_name: str
    target_user_role: str
    product_context: str
    persona_type:str



# ----------- Route ----------- #
@router.post("/persona")
def generate_persona_route(input_data: PersonaSeed):
    try:
        result = generate_persona(input_data.dict())
        return result.dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
