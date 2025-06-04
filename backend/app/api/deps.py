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
