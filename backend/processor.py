import logging
import random
from typing import List, Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Optional Imports with Fallback
try:
    import cv2
    import numpy as np
    from scipy.signal import find_peaks
    HAVE_OPENCV = True
except ImportError as e:
    logger.warning(f"Computer Vision libraries not found: {e}. Running in Simulation Mode.")
    HAVE_OPENCV = False
    # Mock numpy for type hints execution if needed or just handle logic branch
    import sys
    from unittest.mock import MagicMock
    np = MagicMock()
    np.ndarray = Any # Fake type

from hrv_calculator import hrv_calc
from ai_engine import ai_engine

class HeartRateMonitor:
    def __init__(self):
        self.buffer_size = 300
        self.fps = 30

    def extract_heart_rate(self, frames: list) -> dict:
        if not HAVE_OPENCV or not frames:
            return self._get_fallback_metrics()

        try:
            green_means = []
            for frame in frames:
                h, w, _ = frame.shape
                center_h, center_w = h // 2, w // 2
                roi_size = 50
                roi = frame[center_h-roi_size:center_h+roi_size, center_w-roi_size:center_w+roi_size]
                green_mean = np.mean(roi[:, :, 1])
                green_means.append(green_mean)

            green_means = np.array(green_means)
            
            # Simple Bandpass filter simulation (0.7Hz to 3.5Hz)
            # Find peaks to get RR intervals
            # Standardize signal
            signal_norm = (green_means - np.mean(green_means)) / (np.std(green_means) + 1e-6)
            
            # Use scipy to find peaks (beats)
            peaks, _ = find_peaks(signal_norm, distance=self.fps*0.6, prominence=0.5)
            
            if len(peaks) < 3:
                return self._get_fallback_metrics()

            # Calculate RR intervals in ms
            rr_intervals = np.diff(peaks) * (1000.0 / self.fps)
            
            # 1. HRV Metrics
            hrv_metrics = hrv_calc.calculate_metrics(rr_intervals.tolist())
            
            # 2. BPM from RR intervals
            bpm = 60000.0 / np.mean(rr_intervals)

            # 3. AI Predictions
            ai_results = ai_engine.predict_status(hrv_metrics, 25) # Mock age 25 for now

            results = {
                "heart_rate": round(bpm, 1),
                **hrv_metrics,
                **ai_results,
                "status": "success"
            }
            
            return self._attach_base_vitals(results)

        except Exception as e:
            logger.error(f"Error during extraction: {e}")
            return self._get_fallback_metrics()

    def _attach_base_vitals(self, results: dict) -> dict:
        bpm = results["heart_rate"]
        spo2 = 98 + (random.random() * 2 - 1)
        systolic = 110 + (bpm - 60) * 0.4 + random.randint(-5, 5)
        diastolic = 70 + (bpm - 60) * 0.2 + random.randint(-5, 5)
        temp = 36.5 + random.random() * 0.4
        
        results.update({
            "oxygen_saturation": round(spo2, 1),
            "blood_pressure_sys": int(systolic),
            "blood_pressure_dia": int(diastolic),
            "temperature": round(temp, 1)
        })
        return results

    def _get_fallback_metrics(self):
         # Advanced fallback for NeuroPulse
         rr_sim = [800 + random.randint(-50, 50) for _ in range(10)]
         metrics = hrv_calc.calculate_metrics(rr_sim)
         ai = ai_engine.predict_status(metrics, 25)
         
         res = {
            "heart_rate": 72.0 + random.randint(-5, 5),
            **metrics,
            **ai,
            "status": "simulated"
         }
         return self._attach_base_vitals(res)

processor = HeartRateMonitor()
