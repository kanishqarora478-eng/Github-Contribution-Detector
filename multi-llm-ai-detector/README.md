# Multi-LLM AI Detection Backend

A **FastAPI** backend service that detects whether repository code changes are AI-generated using a sophisticated multi-LLM debate system. It analyzes git commits and returns structured verdicts with probability scores, detailed reasoning, and supporting evidence.

---

## Overview

This service implements a three-role debate system where multiple LLMs analyze repository commits:

1. **Role 1 (AI Detection Expert)** - Identifies AI-like patterns in code
2. **Role 2 (Human Code Defender)** - Argues for human authorship
3. **Role 3 (Final Judge)** - Weighs both arguments and delivers final verdict

The system uses **Groq's API** with the `llama-3.1-8b-instant` model, ensuring fast, consistent analysis with structured JSON outputs.

---

## Key Features

- **Multi-LLM Debate System**: Three-role analysis for balanced AI detection
- **Parallel Processing**: Concurrent LLM calls for optimal performance
- **Structured Output**: JSON responses with probability scores and evidence
- **Real-time Analysis**: Fast response times using Groq's optimized models
- **Comprehensive Evidence**: Detailed reasoning and pattern identification
- **Vercel Deployment**: Serverless deployment ready for production

---

## Project Structure

```
multi-llm-ai-detector/
├── main.py                     # FastAPI application entry point
├── app/
│   ├── api/
│   │   └── endpoints.py        # API endpoint definitions
│   ├── models/
│   │   └── schemas.py          # Pydantic data models
│   └── services/
│       ├── preprocessor.py     # Data preprocessing utilities
│       ├── orchestrator.py     # LLM orchestration logic
│       └── llm_prompts.py      # System prompts for each role
├── requirements.txt            # Python dependencies
├── vercel.json                # Vercel deployment config
├── .env                       # Environment variables (API keys)
└── test_api.py                # API testing utilities
```

---

## Technology Stack

- **Framework**: FastAPI with Python 3.9+
- **LLM Provider**: Groq (Llama 3.1 8B Instant)
- **Data Validation**: Pydantic models
- **Async Processing**: asyncio for concurrent operations
- **Deployment**: Vercel serverless functions
- **HTTP Client**: OpenAI SDK for Groq API compatibility

---

## Setup & Installation

### Prerequisites

- **Python 3.9+**
- **Groq API key** - Get yours at [console.groq.com](https://console.groq.com/)

### Local Development

1. **Clone and navigate to the project:**

   ```bash
   cd multi-llm-ai-detector
   ```

2. **Create and activate virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**

   ```bash
   # Create .env file
   echo "GROQ_API_KEY=your_groq_api_key_here" > .env
   ```

5. **Start the development server:**

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Test the API:**
   ```bash
   python test_api.py
   ```

### Production Deployment (Vercel)

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard:**
   - `GROQ_API_KEY`: Your Groq API key

---

## API Documentation

### Base URL

- **Local**: `http://localhost:8000`
- **Production**: `https://your-app.vercel.app`

### Health Check

```http
GET /
```

**Response:**

```json
{
  "message": "AI Detection Multi-LLM Backend is running."
}
```

### Main Analysis Endpoint

```http
POST /analyze-ai-contribution
```

Analyzes repository commits and returns AI-detection analysis.

#### Request Body

| Field        | Type   | Required | Description                      |
| ------------ | ------ | -------- | -------------------------------- |
| `repository` | string | Yes      | Repository name or identifier    |
| `commits`    | array  | Yes      | Non-empty list of commit objects |

**Commit Object Schema:**

| Field       | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `commit_id` | string | Yes      | Commit hash/ID        |
| `message`   | string | Yes      | Commit message        |
| `diff`      | string | Yes      | Full git diff content |
| `author`    | string | Yes      | Author name           |
| `timestamp` | string | Yes      | ISO 8601 timestamp    |

#### Example Request

```json
{
  "repository": "username/repo-name",
  "commits": [
    {
      "commit_id": "abc123def456",
      "message": "Add user authentication system",
      "diff": "diff --git a/src/auth.py b/src/auth.py\nnew file mode 100644\nindex 0000000..1234567\n--- /dev/null\n+++ b/src/auth.py\n@@ -0,0 +1,45 @@\n+from pydantic import BaseModel\n+from typing import Optional\n+\n+class User(BaseModel):\n+    username: str\n+    email: str\n+    password: str\n+    is_active: bool = True\n+\n+def authenticate_user(username: str, password: str) -> Optional[User]:\n+    # Authentication logic here\n+    pass",
      "author": "John Doe",
      "timestamp": "2025-03-01T12:00:00Z"
    }
  ]
}
```

#### Response Schema

| Field              | Type   | Description                                 |
| ------------------ | ------ | ------------------------------------------- |
| `ai_probability`   | float  | 0-100, probability code is AI-generated     |
| `verdict`          | string | "AI-generated", "Human-written", or "Mixed" |
| `confidence_level` | float  | 0-100, confidence in the verdict            |
| `reasoning`        | string | Detailed explanation of the analysis        |
| `evidence`         | array  | Specific patterns supporting the verdict    |
| `analysis_summary` | object | Detailed breakdown of analysis metrics      |

**Analysis Summary Schema:**

| Field                    | Type    | Description                           |
| ------------------------ | ------- | ------------------------------------- |
| `style_consistency`      | string  | "low", "medium", or "high"            |
| `pattern_repetition`     | string  | "low", "medium", or "high"            |
| `sudden_complexity_jump` | boolean | Whether complexity increases suddenly |

#### Example Response

```json
{
  "ai_probability": 78.5,
  "verdict": "Mixed",
  "confidence_level": 85.2,
  "reasoning": "The code shows a mix of AI-generated boilerplate with human-specific implementation details. The Pydantic model structure follows textbook patterns, but the authentication function contains incomplete human-like comments.",
  "evidence": [
    "Perfect Pydantic model structure with type hints",
    "Standard import organization",
    "Incomplete function implementation with placeholder comment",
    "Consistent naming conventions"
  ],
  "analysis_summary": {
    "style_consistency": "high",
    "pattern_repetition": "medium",
    "sudden_complexity_jump": false
  }
}
```

#### Error Responses

| Status | Description                                        |
| ------ | -------------------------------------------------- |
| 400    | Empty commits array                                |
| 422    | Invalid request body (missing fields, wrong types) |
| 500    | Server error or LLM API failure                    |

---

## System Architecture

### Data Flow

1. **Request Validation**: Pydantic models validate incoming data
2. **Preprocessing**: Commits converted to structured context string
3. **Parallel Analysis**: Role 1 and Role 2 analyze simultaneously
4. **Judgment**: Role 3 evaluates both arguments and original context
5. **Response**: Structured verdict returned as JSON

### LLM Role System

#### Role 1: AI Detection Expert

- **Focus**: Identifies AI-like patterns
- **Indicators**: Perfect code structure, textbook implementations, generic naming
- **Output**: Probability estimate, reasoning, evidence

#### Role 2: Human Code Defender

- **Focus**: Argues for human authorship
- **Indicators**: Inconsistencies, trial-and-error patterns, repo-specific conventions
- **Output**: Counter-arguments, human evidence

#### Role 3: Final Judge

- **Focus**: Balanced evaluation of both arguments
- **Process**: Weighs evidence, avoids overconfidence
- **Output**: Final verdict with confidence metrics

### Performance Optimizations

- **Async Processing**: Parallel LLM calls reduce response time
- **JSON Mode**: Structured outputs ensure consistency
- **Temperature 0.0**: Deterministic responses for reliability
- **Connection Pooling**: Efficient API resource usage

---

## Development Guidelines

### Adding New LLM Roles

1. Create new prompt in `app/services/llm_prompts.py`
2. Add role function in `app/services/orchestrator.py`
3. Update Pydantic models if needed
4. Modify the debate logic in the orchestrator

### Testing

```bash
# Run unit tests
python -m pytest

# Run API integration tests
python test_api.py

# Run with coverage
python -m pytest --cov=app
```

### Monitoring

- **Response Times**: Monitor LLM API latency
- **Error Rates**: Track failed LLM calls
- **Token Usage**: Monitor API consumption costs

---

## Configuration

### Environment Variables

| Variable       | Required | Description                   |
| -------------- | -------- | ----------------------------- |
| `GROQ_API_KEY` | Yes      | Groq API authentication key   |
| `LOG_LEVEL`    | Optional | Logging level (default: INFO) |

### Model Parameters

- **Model**: `llama-3.1-8b-instant`
- **Temperature**: `0.0` (deterministic)
- **Max Tokens**: `2048` (adjustable per role)
- **Response Format**: JSON object

---

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Verify `GROQ_API_KEY` is set correctly
   - Check API key validity and quotas

2. **Slow Response Times**
   - Monitor Groq API status
   - Consider reducing input size for large repositories

3. **Memory Issues**
   - Limit concurrent requests
   - Implement request queuing for high traffic

### Debug Mode

Enable debug logging:

```bash
export LOG_LEVEL=DEBUG
uvicorn main:app --reload
```

---

## Dependencies

```txt
fastapi>=0.104.0
uvicorn>=0.24.0
pydantic>=2.5.0
openai>=1.0.0
python-dotenv>=1.0.0
```

---

## License

This backend service is part of the GitHub Contribution Intelligence Dashboard project and is licensed under the MIT License.
