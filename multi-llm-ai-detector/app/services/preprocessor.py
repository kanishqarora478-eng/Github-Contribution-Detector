from app.models.schemas import AnalysisRequest

def preprocess_commits(request: AnalysisRequest) -> str:
    """
    Aggregates commit data into a concise text format suitable for LLM context.
     extracts diffs and commit messages.
    """
    context_blocks = []
    
    context_blocks.append(f"Repository: {request.repository}\n")
    context_blocks.append("--- COMMIT HISTORY ---\n")
    
    for i, commit in enumerate(request.commits, 1):
        block = (
            f"Commit {i}:\n"
            f"ID: {commit.commit_id}\n"
            f"Author: {commit.author}\n"
            f"Timestamp: {commit.timestamp}\n"
            f"Message: {commit.message}\n"
            f"Diff:\n```diff\n{commit.diff}\n```\n"
        )
        context_blocks.append(block)
        
    return "\n".join(context_blocks)
