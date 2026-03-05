from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    gender = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    readings = relationship("Reading", back_populates="user")

class Reading(Base):
    __tablename__ = "readings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    heart_rate = Column(Float)
    # Time Domain HRV
    rmssd = Column(Float)
    sdnn = Column(Float)
    pnn50 = Column(Float)
    mean_rr = Column(Float)
    
    # Frequency Domain HRV
    lf_hf_ratio = Column(Float)

    # AI Insights
    stress_score = Column(Float)
    energy_score = Column(Float)
    focus_level = Column(Float)
    recovery_state = Column(String)
    fatigue_risk = Column(String)

    # Vitals
    oxygen_saturation = Column(Float)
    blood_pressure_sys = Column(Integer)
    blood_pressure_dia = Column(Integer)
    temperature = Column(Float)
    
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="readings")
