from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Fallback to SQLite because Postgres credentials 'admin/admin' failed
# PostgreSQL configuration as requested
DATABASE_URL = "postgresql://admin:admin@localhost:5432/neuropulse"

try:
    engine = create_engine(DATABASE_URL)
except Exception as e:
    # Fallback to SQLite for local development if PG is not reachable
    print(f"PostgreSQL connection failed: {e}. Falling back to SQLite for development.")
    DATABASE_URL = "sqlite:///./neuro_pulse.db"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
