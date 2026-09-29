import os

from groq import Groq
from dotenv import load_dotenv


load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def analyze_with_ai(incident, memories):

    prompt = f"""
You are MemoryOps, an AI Incident Response Agent.

Your job is to help software engineers diagnose and resolve
production incidents using organizational memory.

CURRENT INCIDENT:
{incident}

RELEVANT PAST INCIDENTS FROM HINDSIGHT MEMORY:
{memories}

Analyze the current incident and provide:

1. Possible Root Cause
2. Recommended Immediate Action
3. Recommended Permanent Fix
4. Similar Past Incident Found
5. How the Past Incident Can Help
6. Confidence / Evidence

IMPORTANT RULES:

- Use the past incidents when they are relevant.
- Clearly distinguish remembered information from new reasoning.
- Do not invent facts.
- If no relevant past incident exists, say so.
- Give practical recommendations for an engineer.
- Keep the response concise and easy to scan.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert production incident "
                    "response assistant."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content