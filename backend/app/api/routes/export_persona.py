from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional
from pydantic import BaseModel
import json, base64

from app.db import persona_store

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


@router.post("/persona")
def save_persona(data: PersonaExport, user_id: str = Depends(_decode_user)):
    item = persona_store.create_persona(
        user_id=user_id,
        project_id=data.project_id,
        type=data.type,
        persona_json=data.persona_json,
    )
    return {"id": item["id"]}


@router.get("/persona/me")
def list_my_personas(user_id: str = Depends(_decode_user)):
    return persona_store.list_personas(user_id)


@router.get("/persona/{persona_id}")
def get_persona(persona_id: str, user_id: str = Depends(_decode_user)):
    item = persona_store.get_persona(persona_id)
    if not item or item["user_id"] != user_id:
        raise HTTPException(status_code=404, detail="Persona not found")
    return item


@router.delete("/persona/{persona_id}")
def delete_persona(persona_id: str, user_id: str = Depends(_decode_user)):
    if not persona_store.delete_persona(persona_id, user_id):
        raise HTTPException(status_code=404, detail="Persona not found")
    return {"ok": True}
