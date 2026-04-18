from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.llm import generate_sql, explain_sql
from sqlalchemy import text
from pydantic import BaseModel


router = APIRouter()

def clean_sql(sql: str):
    sql = sql.strip()

    # remove ```sql and ```
    if sql.startswith("```"):
        sql = sql.replace("```sql", "").replace("```", "").strip()

    return sql

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 PREVIEW
@router.post("/preview")
def preview(query: str):
    sql = generate_sql(query)
    explanation = explain_sql(sql)

    return {
        "sql": sql,
        "explanation": explanation
    }

# 🔹 EXECUTE
class SQLRequest(BaseModel):
    sql: str

@router.post("/execute")
def execute(request: SQLRequest, db: Session = Depends(get_db)):

    # sql = request.sql
    sql = clean_sql(request.sql)

    if not sql.lower().startswith("select"):
        return {"error": "Only SELECT allowed"}

    result = db.execute(text(sql))
    rows = result.fetchall()

    data = [dict(row._mapping) for row in rows]

    return {"data": data}