import json
import uuid
from pathlib import Path
from datetime import datetime

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
    item = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "project_id": project_id,
        "type": type,
        "persona_json": persona_json,
        "created_at": datetime.utcnow().isoformat()
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
