# GitHub Contribution Intelligence Dashboard

A web-based analytics platform that transforms GitHub contribution data into structured productivity insights, streak detection reports, and AI-based code probability analysis using a multi-LLM pipeline.

---

## Overview

GitHub displays contribution history but does not provide deeper insights into productivity patterns or inactivity gaps. This project analyzes contribution data and repository structure to generate meaningful performance metrics.

The system combines rule-based streak analysis with a multi-LLM pipeline orchestrated through n8n to produce structured analytics and AI probability estimation.

---

## Problem Statement

Developers often struggle to interpret their contribution consistency and coding trends. While GitHub provides raw activity data, it does not generate actionable insights.

### Existing Gaps

- No automated analysis of streaks and inactivity patterns  
- No structured evaluation of repository behavior or AI-generated code probability  

---

## Solution

The GitHub Contribution Intelligence Dashboard provides:

- Contribution streak detection (longest and current streak)
- Inactivity pattern identification
- Productivity scoring (0–100 scale)
- Multi-LLM AI probability estimation
- Structured performance insights

The system processes GitHub data and presents analytics through an interactive dashboard.

---

## System Architecture

### High-Level Flow

User → Frontend → Backend → n8n Multi-LLM Pipeline → Database → Response

### Architecture Components

**Frontend (React)**  
Accepts GitHub username or repository link and displays analytics.

**Backend (Node.js, Express)**  
Fetches GitHub data and communicates with the n8n pipeline.

**n8n Multi-LLM Pipeline**  
Analyzes repository code and contribution patterns using multiple LLMs. Aggregates outputs to generate productivity score and AI probability estimation.

**Database (MongoDB)**  
Stores processed analytics and user reports.

---

## Model Architecture

**Model Name:** Multi-LLM Analytical Pipeline (n8n Orchestrated)

### Working Process

1. GitHub repository and contribution data are fetched.
2. Data is sent to an n8n workflow.
3. Multiple LLMs analyze patterns and repository structure.
4. Outputs are aggregated.
5. Final productivity score and AI probability percentage are generated.

### Evaluation Criteria

- Accuracy of streak detection
- Consistency between LLM outputs
- Logical validation of AI probability estimation

---

## Technology Stack

- Frontend: React  
- Backend: Node.js, Express  
- AI/ML Pipeline: n8n with multiple LLM integrations  
- Database: MongoDB  
- Deployment: Vercel  

---

## End-to-End Workflow

1. User enters GitHub username or repository link.
2. Backend fetches contribution and repository data.
3. Data is forwarded to the n8n pipeline.
4. LLMs analyze patterns and repository structure.
5. Productivity score and AI-generation probability are calculated.
6. Results are stored in MongoDB.
7. Dashboard displays structured analytics.

---

## Future Scope

### Short-Term
- Contribution heatmaps
- Downloadable performance reports
- Weekly performance summaries

### Long-Term
- Productivity forecasting models
- Team-level analytics dashboard
- Recruiter-focused analytics panel
- Enterprise-scale repository intelligence system

---

## Known Limitations

- Only public GitHub repositories can be analyzed
- Private repositories are not accessible
- AI probability results are estimations, not definitive conclusions

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

- Encourages consistent development habits
- Provides measurable productivity insights
- Assists recruiters in structured contribution evaluation
- Introduces AI-assisted repository behavior analysis
