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
