import os
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_sql(query):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """
You are a SQL generator.

Database:
students(id, name, age, class)
marks(id, student_id, subject, marks)

Rules:
- Only SELECT queries
- Use JOIN properly
- Return ONLY SQL query
"""
            },
            {"role": "user", "content": query}
        ],
        temperature=0
    )

    return response.choices[0].message.content.strip()


def explain_sql(sql):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "Explain the SQL query in simple terms for a beginner."
            },
            {
                "role": "user",
                "content": sql
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content.strip()