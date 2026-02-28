from pydantic import BaseModel, Field
from typing import List

class Commit(BaseModel):
    commit_id: str
    message: str
    diff: str
    author: str
    timestamp: str

class AnalysisRequest(BaseModel):
    repository: str
    commits: List[Commit]

class AnalysisSummary(BaseModel):
    style_consistency: str = Field(description="Must be 'low', 'medium', or 'high'")
    pattern_repetition: str = Field(description="Must be 'low', 'medium', or 'high'")
    sudden_complexity_jump: bool

class AnalysisResponse(BaseModel):
    ai_probability: float = Field(ge=0, le=100, description="Probability (0-100) that the code is AI-generated.")
    verdict: str = Field(description="Must be 'AI-generated', 'Human-written', or 'Mixed'")
    confidence_level: float = Field(ge=0, le=100, description="Confidence level of the verdict.")
    reasoning: str = Field(description="Clear explanation of the final decision, considering both arguments.")
    evidence: List[str] = Field(description="List of specific patterns or lines from the diff supporting the verdict.")
    analysis_summary: AnalysisSummary

class AgentArgument(BaseModel):
    probability_estimate: float = Field(ge=0, le=100)
    reasoning: str
    evidence: List[str]
