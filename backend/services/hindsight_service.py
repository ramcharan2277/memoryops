import os
from hindsight_client import Hindsight
from dotenv import load_dotenv

load_dotenv()

HINDSIGHT_API_URL = os.getenv(
    "HINDSIGHT_API_URL",
    "https://api.hindsight.vectorize.io"
)

HINDSIGHT_API_KEY = os.getenv("HINDSIGHT_API_KEY")

BANK_ID = "memoryops-incidents"

client = Hindsight(
    base_url=HINDSIGHT_API_URL,
    api_key=HINDSIGHT_API_KEY
)


def recall_incidents(query: str):
    return client.recall(
        bank_id=BANK_ID,
        query=query
    )


def store_incident(content: str):
    return client.retain(
        bank_id=BANK_ID,
        content=content
    )