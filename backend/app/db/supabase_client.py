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
