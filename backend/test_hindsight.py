import os
from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv()

client = Hindsight(
    base_url=os.getenv("HINDSIGHT_API_URL"),
    api_key=os.getenv("HINDSIGHT_API_KEY")
)

BANK_ID = "memoryops-incidents"

# Create our MemoryOps memory bank
try:
    client.create_bank(
        bank_id=BANK_ID,
        name="MemoryOps Incident Memory"
    )
    print("Memory bank created!")
except Exception as e:
    print("Bank may already exist:", e)

# Store our first incident
client.retain(
    bank_id=BANK_ID,
    content="""
    Incident ID: INC-001

    Service: Payment API

    Error: HTTP 503 Service Unavailable

    Root Cause:
    Database connection pool exhaustion.

    Resolution:
    Increased the database connection pool size and restarted the affected service.

    Result:
    Payment API recovered successfully.

    This incident should be remembered as a previous successful resolution
    for future payment API 503 incidents.
    """,
    context="Production incident post-mortem"
)

print("Incident stored in Hindsight!")

# Search memory
result = client.recall(
    bank_id=BANK_ID,
    query="Payment API 503 error previous incidents and successful solutions"
)

print("\n--- RECALLED MEMORIES ---")

for memory in result.results:
    print(memory.text)
    print("---")

client.close()