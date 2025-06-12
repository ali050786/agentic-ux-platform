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
