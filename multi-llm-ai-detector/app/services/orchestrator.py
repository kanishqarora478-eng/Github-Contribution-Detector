import asyncio
import os
import json
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

from app.models.schemas import AgentArgument, AnalysisResponse
from app.services.llm_prompts import ROLE1_EXPERT_PROMPT, ROLE2_DEFENDER_PROMPT, ROLE3_JUDGE_PROMPT

# Default parameters to prevent data hallucination and ensure deterministic behavior
# Using Groq's Llama 3 model for free, fast serverless deployment
LLM_MODEL = "llama-3.1-8b-instant" 
LLM_TEMPERATURE = 0.0

# Initialize the async OpenAI client pointing to Groq's API
client = AsyncOpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.environ.get("GROQ_API_KEY") # Required to authenticate with Groq
)

async def run_role_1(context: str) -> AgentArgument:
    """Runs the AI Detection Expert agent."""
    completion = await client.chat.completions.create(
        model=LLM_MODEL,
        temperature=LLM_TEMPERATURE,
        messages=[
            {"role": "system", "content": ROLE1_EXPERT_PROMPT + "\n\nRETURN ONLY VALID JSON WITH KEYS: probability_estimate (float 0-100), reasoning (string), evidence (array of strings)."},
            {"role": "user", "content": context}
        ],
        response_format={"type": "json_object"}
    )
    return AgentArgument(**json.loads(completion.choices[0].message.content))

async def run_role_2(context: str) -> AgentArgument:
    """Runs the Human Code Defender agent."""
    completion = await client.chat.completions.create(
        model=LLM_MODEL,
        temperature=LLM_TEMPERATURE,
        messages=[
            {"role": "system", "content": ROLE2_DEFENDER_PROMPT + "\n\nRETURN ONLY VALID JSON WITH KEYS: probability_estimate (float 0-100), reasoning (string), evidence (array of strings)."},
            {"role": "user", "content": context}
        ],
        response_format={"type": "json_object"}
    )
    return AgentArgument(**json.loads(completion.choices[0].message.content))

async def run_role_3(context: str, role1_arg: AgentArgument, role2_arg: AgentArgument) -> AnalysisResponse:
    """Runs the Final Judge agent."""
    
    judge_context = f"""
ORIGINAL CONTEXT:
{context}

---
ROLE 1 (AI DETECTION EXPERT) ARGUMENT:
Probability: {role1_arg.probability_estimate}%
Reasoning: {role1_arg.reasoning}
Evidence: {role1_arg.evidence}

---
ROLE 2 (HUMAN CODE DEFENDER) ARGUMENT:
Probability: {role2_arg.probability_estimate}%
Reasoning: {role2_arg.reasoning}
Evidence: {role2_arg.evidence}
    """
    
    completion = await client.chat.completions.create(
        model=LLM_MODEL,
        temperature=LLM_TEMPERATURE,
        messages=[
            {"role": "system", "content": ROLE3_JUDGE_PROMPT + "\n\nRETURN ONLY VALID JSON MATCHING Schema:\n{'ai_probability': float, 'verdict': 'AI-generated' | 'Human-written' | 'Mixed', 'confidence_level': float, 'reasoning': string, 'evidence': [string], 'analysis_summary': {'style_consistency': 'low'|'medium'|'high', 'pattern_repetition': 'low'|'medium'|'high', 'sudden_complexity_jump': boolean}}"},
            {"role": "user", "content": judge_context}
        ],
        response_format={"type": "json_object"}
    )
    return AnalysisResponse(**json.loads(completion.choices[0].message.content))

async def conduct_multi_llm_conference(context: str) -> AnalysisResponse:
    """
    Orchestrates the debate:
    1. Runs Role 1 & Role 2 concurrently.
    2. Feeds their results to Role 3.
    """
    # Run Role 1 and Role 2 in parallel
    role1_res, role2_res = await asyncio.gather(
        run_role_1(context),
        run_role_2(context)
    )
    
    # Run Final Judge
    final_decision = await run_role_3(context, role1_res, role2_res)
    
    return final_decision
