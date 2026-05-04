"""KAFF Builders — Agent API

This file handles ONLY the connection between ChatWidget.jsx and your agent.
Write your LangGraph agent logic below the TODO comment.

Run:
    uvicorn agent:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://kaff-kappa.vercel.app"],  # Tighten to your domain in production
    allow_methods=["POST"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []  # [{"role": "user" | "agent", "content": "..."}]


class ChatResponse(BaseModel):
    reply: str


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    # TODO: plug your LangGraph agent in here
    # req.message  — latest user message
    # req.history  — prior turns for context
    reply = "Agent not yet connected."
    return ChatResponse(reply=reply)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
