import os
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Primary choice: Environment Variable (Render/Production)
# 2. Secondary choice: Local Postgres (admin/admin)
# 3. Fallback: SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:admin@localhost:5432/neuropulse")

def get_engine(url):
    if url.startswith("sqlite"):
        return create_engine(url, connect_args={"check_same_thread": False})
    return create_engine(url)

try:
    # Try to connect to the specified DATABASE_URL
    engine = get_engine(DATABASE_URL)
    # Force a connection check
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
except Exception as e:
    print(f"Primary database connection failed: {e}. Falling back to local SQLite.")
    DATABASE_URL = "sqlite:///./wellbeing.db"
    engine = get_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
