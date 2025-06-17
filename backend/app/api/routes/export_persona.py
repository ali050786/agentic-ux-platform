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
            "profile_image_url": res.data.get("profile_image_url"),
            "theme": res.data.get("theme")
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
