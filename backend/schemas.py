from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ReadingBase(BaseModel):
    heart_rate: float
    rmssd: float
    sdnn: float
    pnn50: float
    mean_rr: float
    lf_hf_ratio: float
    stress_score: int
    energy_score: int
    focus_level: int
    recovery_state: str
    fatigue_risk: str
    oxygen_saturation: float
    blood_pressure_sys: int
    blood_pressure_dia: int
    temperature: float

class ReadingCreate(ReadingBase):
    pass

class Reading(ReadingBase):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str
    age: int
    gender: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    readings: List[Reading] = []
    created_at: datetime

    class Config:
        orm_mode = True
