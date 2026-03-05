from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import io
# cv2/numpy are imported inside processor or lazily to avoid crash if missing
import schemas, models, database, processor

# Initialize DB
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Welltory AI", description="AI Powered Health Monitoring with HRV & Energy insights")

# Auto-create first user for demo
@app.on_event("startup")
def startup_event():
    db = database.SessionLocal()
    try:
        user = db.query(models.User).filter(models.User.id == 1).first()
        if not user:
            new_user = models.User(id=1, name="Priyanshu", age=25, gender="Male")
            db.add(new_user)
            db.commit()
            print("Default user 1 created")
    finally:
        db.close()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "VitalSync API Operating Normal"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = models.User(name=user.name, age=user.age, gender=user.gender)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=schemas.User)
def get_user(user_id: int, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/scan/{user_id}", response_model=schemas.Reading)
async def process_scan(user_id: int, file: UploadFile = File(...), db: Session = Depends(database.get_db)):
    try:
        contents = await file.read()
        frames = []
        if processor.HAVE_OPENCV:
            import cv2
            import numpy as np
            import tempfile
            import os
            
            tfile = tempfile.NamedTemporaryFile(delete=False, suffix=".webm")
            tfile.write(contents)
            tfile.close()
            
            cap = cv2.VideoCapture(tfile.name)
            frame_count = 0
            while cap.isOpened() and frame_count < 300: 
                ret, frame = cap.read()
                if not ret: break
                frames.append(frame)
                frame_count += 1
            cap.release()
            os.unlink(tfile.name)
        
        results = processor.processor.extract_heart_rate(frames)
        
        # Save to DB - Unpack all results into model
        db_reading = models.Reading(
            user_id=user_id,
            **{k: v for k, v in results.items() if k != "status"}
        )
        db.add(db_reading)
        db.commit()
        db.refresh(db_reading)
        
        return db_reading

    except Exception as e:
        print(f"Error processing scan: {e}")
        fallback = processor.processor._get_fallback_metrics()
        db_reading = models.Reading(user_id=user_id, **{k: v for k, v in fallback.items() if k != "status"})
        db.add(db_reading)
        db.commit()
        db.refresh(db_reading)
        return db_reading

@app.get("/history/{user_id}", response_model=List[schemas.Reading])
def get_history(user_id: int, db: Session = Depends(database.get_db)):
    readings = db.query(models.Reading).filter(models.Reading.user_id == user_id).order_by(models.Reading.timestamp.desc()).all()
    return readings

# NeuroPulse AI Coach
@app.post("/chat/")
def chat_with_ai(query: str, user_id: int = 1, db: Session = Depends(database.get_db)):
    latest = db.query(models.Reading).filter(models.Reading.user_id == user_id).order_by(models.Reading.timestamp.desc()).first()
    
    query = query.lower()
    from ai_engine import ai_engine
    
    if latest:
        status = {
            "stress_score": latest.stress_score,
            "energy_score": latest.energy_score,
            "focus_level": latest.focus_level
        }
        recs = ai_engine.get_recommendations(status)
        
        if "energy" in query:
            return {"response": f"Your current energy is at {latest.energy_score}%. {recs[0] if recs else ''}"}
        if "stress" in query or "anxious" in query:
            return {"response": f"Stress level is {latest.stress_score}%. I recommend a focus on heart-rate variability through deep breathing."}
            
    return {"response": "NeuroPulse AI is analyzing your bio-signals. How can I help you optimize your health today?"}
