# Multi-LLM AI Detection Backend

A **FastAPI** backend that detects whether repository code changes are AI-generated. It uses a **multi-LLM debate** (three distinct LLM roles) to analyze git commits and return a structured verdict with probability, reasoning, and evidence.

---

## Overview

The service accepts a repository name and a list of commits (with messages and diffs), preprocesses them into a single context string, then runs a **conference-style debate**:

1. **Role 1 (AI Detection Expert)** and **Role 2 (Human Code Defender)** run **in parallel**, each analyzing the same context and returning a probability and evidence.
2. **Role 3 (Final Judge)** receives both arguments plus the original context and produces the **final verdict** and structured analysis.

All LLM calls use **Groq’s API** with the `llama-3.1-8b-instant` model, `temperature=0.0`, and **JSON mode** so outputs are strictly typed and parseable.

---

## Project Structure

```
multi-llm-ai-detector/
├── main.py                 # FastAPI app, CORS, router mounting
├── app/
│   ├── api/
│   │   └── endpoints.py     # POST /analyze-ai-contribution
│   ├── models/
│   │   └── schemas.py       # Pydantic: Commit, AnalysisRequest, AnalysisResponse, AgentArgument
│   └── services/
│       ├── preprocessor.py  # Turns commits into one context string
│       ├── orchestrator.py  # Runs 3 LLM roles (Groq client, asyncio)
│       └── llm_prompts.py   # System prompts for Role 1, 2, 3
├── requirements.txt
├── vercel.json             # Vercel serverless deployment
├── .env                    # GROQ_API_KEY (not committed)
└── test_api.py             # Optional API test script
```

---

## Setup & Requirements

- **Python 3.9+**
- **Groq API key** — the backend uses [Groq](https://console.groq.com/) with the OpenAI-compatible API and the `llama-3.1-8b-instant` model.

### Steps

1. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` in the project root:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

5. (Optional) Run the test client:
   ```bash
   python test_api.py
   ```

---

## API

### Base URL

- Local: `http://localhost:8000`
- Root: `GET /` returns `{"message": "AI Detection Multi-LLM Backend is running."}`

### Endpoint: `POST /analyze-ai-contribution`

Analyzes the given commits and returns an AI-detection verdict.

#### Request body (JSON)

| Field         | Type     | Description                    |
|---------------|----------|--------------------------------|
| `repository`  | string   | Repository name or identifier  |
| `commits`     | array    | Non-empty list of commit objects |

Each commit object:

| Field       | Type   | Description        |
|------------|--------|--------------------|
| `commit_id`| string | Commit hash/ID     |
| `message`  | string | Commit message     |
| `diff`     | string | Full patch (e.g. `git diff`) |
| `author`   | string | Author name        |
| `timestamp`| string | Commit timestamp   |

**Example:**

```json
{
  "repository": "my-app",
  "commits": [
    {
      "commit_id": "abc123",
      "message": "Add user schema",
      "diff": "diff --git a/app/models.py b/app/models.py\n+from pydantic import BaseModel\n+class User(BaseModel): ...",
      "author": "Dev",
      "timestamp": "2025-03-01T12:00:00Z"
    }
  ]
}
```

#### Response (200 OK)

| Field               | Type    | Description |
|---------------------|---------|-------------|
| `ai_probability`    | float   | 0–100, probability that the code is AI-generated |
| `verdict`           | string  | `"AI-generated"` \| `"Human-written"` \| `"Mixed"` |
| `confidence_level`  | float   | 0–100, confidence in the verdict |
| `reasoning`         | string  | Explanation considering both sides |
| `evidence`          | string[]| Specific patterns or lines supporting the verdict |
| `analysis_summary`  | object  | See below |

`analysis_summary`:

| Field                   | Type   | Description |
|-------------------------|--------|-------------|
| `style_consistency`     | string | `"low"` \| `"medium"` \| `"high"` |
| `pattern_repetition`    | string | `"low"` \| `"medium"` \| `"high"` |
| `sudden_complexity_jump`| boolean| Whether complexity jumps suddenly |

#### Error responses

- **400** — `commits` is empty.
- **422** — Request body invalid (e.g. missing or wrong types).
- **500** — Server or LLM error (message in `detail`).

---

## Backend Flow (Step by Step)

### 1. Request validation (Pydantic)

The body is validated against `AnalysisRequest` in `app/models/schemas.py`. Invalid payloads yield **422 Unprocessable Entity**.

### 2. Preprocessing (`app/services/preprocessor.py`)

`preprocess_commits(request)` builds a single text block:

- Repository name
- For each commit: index, ID, author, timestamp, message, and the diff wrapped in ` ```diff ... ``` `

This string is the shared context for all three LLM roles.

### 3. Multi-LLM conference (`app/services/orchestrator.py`)

- **Parallel phase:** `run_role_1(context)` and `run_role_2(context)` are executed with `asyncio.gather()`.  
  - **Role 1 (AI Detection Expert):** Looks for AI-like patterns (uniform formatting, textbook use of libraries, generic names, lack of incremental reasoning, etc.). Returns JSON: `probability_estimate`, `reasoning`, `evidence`.  
  - **Role 2 (Human Code Defender):** Argues for human authorship (inconsistencies, hacks, trial-and-error, repo-specific conventions). Same JSON shape.  
  Both use `temperature=0.0` and `response_format={"type": "json_object"}`.

- **Judge phase:** `run_role_3(context, role1_arg, role2_arg)` receives the original context plus both arguments. The Judge is prompted to stay neutral, weigh both sides, and avoid overconfidence. It returns the full `AnalysisResponse` (verdict, `ai_probability`, `confidence_level`, `reasoning`, `evidence`, `analysis_summary`), again via JSON mode.

### 4. Response

The orchestrator’s `AnalysisResponse` is returned as-is by the FastAPI endpoint with **200 OK**.

---

## Prompts and guardrails (`app/services/llm_prompts.py`)

- **Role 1:** Must cite specific lines from the diffs; treats “perfect” code (e.g. flawless Pydantic/FastAPI usage) as strong AI signal.
- **Role 2:** Forbidden from using “clean code” or “use of standard libraries” as human evidence; must cite concrete human-like indicators or concede.
- **Role 3:** Treats “perfect code” as baseline for AI; instructed to set `ai_probability > 85` when e.g. textbook boilerplate, perfect docstrings, or line-by-line comments appear; defaults toward “Mixed” or “Human-written” when evidence is not strong.

All outputs are constrained to the specified JSON schemas to reduce hallucination and keep responses machine-parseable.

---

## Deployment (Vercel)

The app is configured for Vercel’s Python runtime via `vercel.json`:

- Build uses `main.py` (`@vercel/python`).
- All routes are forwarded to `main.py`.

Set `GROQ_API_KEY` in the Vercel project environment variables.

---

## Dependencies (`requirements.txt`)

- **fastapi** — Web framework and routing
- **uvicorn** — ASGI server
- **pydantic** — Request/response and internal schemas
- **openai** — Used as the HTTP client for Groq’s OpenAI-compatible API
- **python-dotenv** — Loads `.env` for `GROQ_API_KEY`

---

## Summary

| Aspect        | Detail |
|---------------|--------|
| **Framework** | FastAPI |
| **LLM**       | Groq, `llama-3.1-8b-instant` |
| **Auth**      | `GROQ_API_KEY` in `.env` |
| **Design**    | Three-role debate (Expert + Defender in parallel → Judge) |
| **Output**    | Structured JSON (probability, verdict, reasoning, evidence, analysis_summary) |
| **Deploy**    | Vercel (Python serverless) |
