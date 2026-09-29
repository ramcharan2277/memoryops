from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.hindsight_service import (
    recall_incidents,
    store_incident
)

from services.llm_service import analyze_with_ai


app = FastAPI(
    title="MemoryOps",
    description="AI Incident Response Agent powered by Hindsight",
    version="1.0"
)


# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Request Model
# -----------------------------

class IncidentRequest(BaseModel):
    incident: str
    service: str = "Unknown Service"
    severity: str = "SEV-3"


# -----------------------------
# Home
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "MemoryOps AI Incident Response Agent is running"
    }


# -----------------------------
# Analyze Incident
# -----------------------------

@app.post("/analyze-incident")
def analyze_incident(request: IncidentRequest):

    # Build structured incident context
    incident_context = f"""
SERVICE: {request.service}
SEVERITY: {request.severity}

INCIDENT:
{request.incident}
"""

    # 1. Recall previous incidents from Hindsight
    memories = recall_incidents(incident_context)

    # 2. Ask Groq AI to analyze the incident
    analysis = analyze_with_ai(
        incident_context,
        memories
    )

    # 3. Store the new learning in Hindsight
    learning = f"""
SERVICE: {request.service}
SEVERITY: {request.severity}

CURRENT INCIDENT:
{request.incident}

AI ANALYSIS:
{analysis}
"""

    store_incident(learning)

    # 4. Return everything to frontend
    return {
        "service": request.service,
        "severity": request.severity,
        "incident": request.incident,
        "memories": memories,
        "analysis": analysis
    }