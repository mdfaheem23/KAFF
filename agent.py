"""KAFF Builders — LangGraph Agent Boilerplate

Fill in your tools and logic below, then run:
    uvicorn agent:app --reload --port 8000

The frontend ChatWidget.jsx is already wired — just uncomment the fetch() call.
"""

import os
from typing import Annotated, TypedDict

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_anthropic import ChatAnthropic
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.tools import tool
from langgraph.graph import END, StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode

load_dotenv()

# ── Model ──────────────────────────────────────────────────────────────────────
llm = ChatAnthropic(
    model="claude-sonnet-4-6",
    api_key=os.environ["ANTHROPIC_API_KEY"],
    temperature=0.3,
)

# ── System prompt ──────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are the KAFF Builders AI agent — a precise, editorial assistant
for a premium architectural and construction firm based in the UAE.

Speak with clarity and confidence. Be concise. Do not use bullet points unless asked.
Refer to the firm always as 'KAFF Builders'."""


# ── Tools — add your own below ─────────────────────────────────────────────────
@tool
def get_company_info() -> str:
    """Return key facts about KAFF Builders."""
    return (
        "KAFF Builders is a UAE-based architectural and construction firm specialising "
        "in high-end residential and commercial projects. Founded with a focus on craft "
        "and precision, the firm has delivered over 40 projects across the region."
    )


@tool
def get_contact_info() -> str:
    """Return KAFF Builders contact details."""
    return "For enquiries, email info@kaffbuilders.com or call +971 4 000 0000."


TOOLS = [get_company_info, get_contact_info]
llm_with_tools = llm.bind_tools(TOOLS)


# ── Graph state ────────────────────────────────────────────────────────────────
class State(TypedDict):
    messages: Annotated[list, add_messages]


# ── Nodes ──────────────────────────────────────────────────────────────────────
def call_model(state: State) -> dict:
    msgs = [SystemMessage(content=SYSTEM_PROMPT)] + state["messages"]
    response = llm_with_tools.invoke(msgs)
    return {"messages": [response]}


def should_continue(state: State) -> str:
    last = state["messages"][-1]
    if isinstance(last, AIMessage) and last.tool_calls:
        return "tools"
    return END


# ── Build graph ────────────────────────────────────────────────────────────────
tool_node = ToolNode(TOOLS)

graph_builder = StateGraph(State)
graph_builder.add_node("agent", call_model)
graph_builder.add_node("tools", tool_node)
graph_builder.set_entry_point("agent")
graph_builder.add_conditional_edges("agent", should_continue)
graph_builder.add_edge("tools", "agent")

agent = graph_builder.compile()


# ── FastAPI server ─────────────────────────────────────────────────────────────
app = FastAPI(title="KAFF Builders Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten in production
    allow_methods=["POST"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []


class ChatResponse(BaseModel):
    reply: str


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    history = [
        HumanMessage(content=m["content"]) if m["role"] == "user"
        else AIMessage(content=m["content"])
        for m in req.history
    ]
    result = agent.invoke({"messages": history + [HumanMessage(content=req.message)]})
    reply = result["messages"][-1].content
    return ChatResponse(reply=reply)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
