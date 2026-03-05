import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
from typing import Dict, Any
import random

class HealthAIEngine:
    def __init__(self):
        # In a real app, these would be pre-trained models loaded from disk
        self.stress_model = None
        self.energy_model = None
        
    def predict_status(self, hrv_metrics: Dict[str, float], user_age: int) -> Dict[str, Any]:
        """
        Predicts Stress, Energy, Focus, and Fatigue risk.
        """
        rmssd = hrv_metrics.get("rmssd", 40)
        sdnn = hrv_metrics.get("sdnn", 50)
        
        # Heuristic-based 'AI' logic (simulating what a trained model would do)
        
        # Stress: Inverse to RMSSD
        stress_score = max(5, min(95, 100 - (rmssd * 1.2) + (user_age * 0.2)))
        
        # Energy: Proportional to SDNN and RMSSD
        energy_score = max(5, min(100, (sdnn * 0.8) + (rmssd * 0.4) - (stress_score * 0.2)))
        
        # Focus Level: High HRV and Moderate Stress is the 'Flow' state
        focus_level = max(0, min(100, 80 - abs(stress_score - 30) - (100 - energy_score) * 0.3))
        
        # Fatigue Risk
        fatigue_risk = "Low"
        if energy_score < 30: fatigue_risk = "High"
        elif energy_score < 60: fatigue_risk = "Moderate"

        return {
            "stress_score": int(stress_score),
            "energy_score": int(energy_score),
            "focus_level": int(focus_level),
            "fatigue_risk": fatigue_risk,
            "recovery_state": "Optimal" if rmssd > 50 else "Needed"
        }

    def get_recommendations(self, status: Dict[str, Any]) -> list:
        stress = status["stress_score"]
        energy = status["energy_score"]
        
        recs = []
        if stress > 60:
            recs.append("Triggering Calm Mode: 5-minute box breathing recommended.")
            recs.append("High sympathetic activity detected. Avoid caffeine for the next 4 hours.")
        if energy < 40:
            recs.append("Energy Battery Low: Prioritize 20-minute power nap.")
        if status["focus_level"] > 75:
            recs.append("Peak Flow State: Ideal time for deep work or complex tasks.")
            
        if not recs:
            recs.append("Vitals look stable. Maintain current activity levels.")
            
        return recs

ai_engine = HealthAIEngine()
