from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import orientation, define, export_persona

app = FastAPI(title="Agentic UX Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

app.include_router(orientation.router, prefix="/api/orientation", tags=["Orientation"])
app.include_router(define.router, prefix="/api/define", tags=["Define"])
app.include_router(export_persona.router, prefix="/api/export", tags=["Export"])

@app.get("/")
def root():
    return {"message": "Agentic UX API is running"}
