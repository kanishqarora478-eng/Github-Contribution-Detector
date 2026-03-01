# GitHub Contribution Intelligence Dashboard

A comprehensive analytics platform that transforms GitHub contribution data into structured productivity insights, streak detection reports, and AI-based code probability analysis using a multi-LLM pipeline.

---

## Overview

GitHub displays contribution history but lacks deeper insights into productivity patterns or inactivity gaps. This project analyzes contribution data and repository structure to generate meaningful performance metrics through an integrated system of rule-based analysis and AI-powered detection.

The system combines FastAPI backend services with a React frontend to provide real-time analytics and AI probability estimation.

---

## Problem Statement

Developers struggle to interpret their contribution consistency and coding trends. While GitHub provides raw activity data, it doesn't generate actionable insights or AI-assisted analysis.

### Existing Gaps

- No automated analysis of streaks and inactivity patterns
- No structured evaluation of repository behavior or AI-generated code probability
- Lack of comprehensive productivity metrics
- Missing AI-powered code analysis capabilities

---

## Solution

The GitHub Contribution Intelligence Dashboard provides:

- **Contribution Analysis**: Streak detection (longest and current streak), inactivity pattern identification
- **Productivity Scoring**: 0–100 scale productivity metrics
- **AI Detection**: Multi-LLM AI probability estimation using Groq's Llama models
- **Interactive Dashboard**: Real-time analytics with modern UI components
- **Structured Insights**: Performance reports and trend analysis

The system processes GitHub data through a FastAPI backend and presents analytics through a React-based dashboard with Material-UI and Tailwind CSS styling.

---

## System Architecture

### High-Level Flow

User → React Frontend → FastAPI Backend → Multi-LLM Pipeline → Response

### Architecture Components

**Frontend (React + TypeScript)**

- Built with Vite for fast development
- Material-UI and Radix UI components for modern interface
- Tailwind CSS for responsive styling
- Real-time data visualization with Recharts

**Backend (FastAPI, Python)**

- RESTful API endpoints for GitHub data processing
- Multi-LLM orchestration using Groq's API
- Asynchronous processing for optimal performance
- Structured JSON responses with Pydantic models

**Multi-LLM Pipeline**

- Three-role debate system (AI Detection Expert, Human Code Defender, Final Judge)
- Parallel processing for efficient analysis
- Groq's Llama 3.1 8B Instant model with JSON mode
- Structured probability estimation and evidence collection

---

## Model Architecture

**Model Name:** Multi-LLM Analytical Pipeline (Groq Orchestrated)

### Working Process

1. GitHub repository and contribution data are fetched via API
2. Data is preprocessed and sent to the multi-LLM pipeline
3. Three LLM roles analyze patterns in parallel debate format
4. Judge role aggregates outputs and generates final verdict
5. Structured analysis returned with probability scores and evidence

### Evaluation Criteria

- Accuracy of streak detection algorithms
- Consistency between LLM role outputs
- Logical validation of AI probability estimation
- Real-time processing performance

---

## Technology Stack

### Frontend

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Libraries**: Material-UI, Radix UI components
- **Styling**: Tailwind CSS 4.1.12
- **Charts**: Recharts for data visualization
- **Routing**: React Router 7.13.0

### Backend

- **Framework**: FastAPI with Python 3.9+
- **LLM Provider**: Groq (Llama 3.1 8B Instant)
- **Data Validation**: Pydantic models
- **Async Processing**: asyncio for concurrent LLM calls
- **Deployment**: Vercel serverless functions

---

## Project Structure

```
Github-Contribution-Detector/
├── README.md                    # Main project documentation
├── my-app/                      # React frontend application
│   ├── src/
│   │   ├── app/                 # React components and pages
│   │   ├── assets/              # Static assets
│   │   ├── styles/              # CSS and styling files
│   │   └── main.tsx             # Application entry point
│   ├── package.json             # Frontend dependencies
│   └── vite.config.ts           # Vite configuration
└── multi-llm-ai-detector/       # FastAPI backend
    ├── app/
    │   ├── api/                 # API endpoints
    │   ├── models/              # Pydantic schemas
    │   └── services/            # Business logic and LLM orchestration
    ├── main.py                  # FastAPI application
    ├── requirements.txt         # Python dependencies
    └── vercel.json              # Deployment configuration
```

---

## End-to-End Workflow

1. User enters GitHub username or repository link in React frontend
2. Frontend sends request to FastAPI backend
3. Backend fetches contribution and repository data from GitHub API
4. Data is preprocessed and sent to multi-LLM pipeline
5. Three LLM roles analyze patterns in parallel debate format
6. Judge role aggregates outputs and generates final verdict
7. Productivity score and AI-generation probability calculated
8. Results returned to frontend and displayed in interactive dashboard

---

## API Endpoints

### Backend: `POST /analyze-ai-contribution`

Analyzes repository commits and returns AI-detection analysis.

**Request:**

```json
{
  "repository": "username/repo",
  "commits": [
    {
      "commit_id": "hash",
      "message": "commit message",
      "diff": "git diff content",
      "author": "author name",
      "timestamp": "ISO timestamp"
    }
  ]
}
```

**Response:**

```json
{
  "ai_probability": 75.5,
  "verdict": "Mixed",
  "confidence_level": 85.2,
  "reasoning": "detailed analysis",
  "evidence": ["evidence1", "evidence2"],
  "analysis_summary": {
    "style_consistency": "medium",
    "pattern_repetition": "high",
    "sudden_complexity_jump": true
  }
}
```

---

## Development Setup

### Frontend (my-app)

```bash
cd my-app
npm install
npm run dev
```

### Backend (multi-llm-ai-detector)

```bash
cd multi-llm-ai-detector
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Create .env with GROQ_API_KEY
uvicorn main:app --reload
```

---

## Future Scope

### Short-Term

- [ ] Contribution heatmaps with calendar visualization
- [ ] Downloadable performance reports (PDF/CSV)
- [ ] Weekly performance summaries via email
- [ ] Real-time GitHub webhook integration

### Long-Term

- [ ] Productivity forecasting using ML models
- [ ] Team-level analytics dashboard
- [ ] Recruiter-focused analytics panel
- [ ] Enterprise-scale repository intelligence system
- [ ] Integration with additional Git providers (GitLab, Bitbucket)

---

## Known Limitations

- Only public GitHub repositories can be analyzed
- Private repositories require authentication tokens
- AI probability results are estimations, not definitive conclusions
- Rate limiting from GitHub API may affect real-time analysis
- LLM processing time varies based on repository size

---

## Team

**Bhavish Dhar** — Team Lead & Backend Developer  
System architecture, API integration, LLM pipeline coordination

**Kanishq Arora** — Frontend Developer  
UI design, dashboard implementation, research

**Anshika Verma** — Frontend Developer  
UI components, visualization, testing

---

## Impact

- Encourages consistent development habits through streak tracking
- Provides measurable productivity insights with AI analysis
- Assists recruiters in structured contribution evaluation
- Introduces AI-assisted repository behavior analysis
- Enables data-driven development decisions

---

## License

This project is licensed under the MIT License - see the repository for details.
