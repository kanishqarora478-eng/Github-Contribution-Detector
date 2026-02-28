from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalysisRequest, AnalysisResponse
from app.services.preprocessor import preprocess_commits
from app.services.orchestrator import conduct_multi_llm_conference

router = APIRouter()

@router.post("/analyze-ai-contribution", response_model=AnalysisResponse)
async def analyze_ai_contribution(request: AnalysisRequest):
    try:
        if not request.commits:
            raise HTTPException(status_code=400, detail="Commit list cannot be empty.")

        # 1. Preprocess the incoming repository data
        context = preprocess_commits(request)

        # 2. Orchestrate multi-LLM debate
        final_decision = await conduct_multi_llm_conference(context)
        
        # 3. Return structured Output
        return final_decision
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
