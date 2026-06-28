from fastapi import FastAPI
from database import engine, Base
from routers import entries

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Software Diary", version="0.1.0")

app.include_router(entries.router)


@app.get("/health")
def health():
    return {"status": "ok"}
