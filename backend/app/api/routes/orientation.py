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