# 🧬 WELLBEING_SENSINGG (NeuroPulse AI)

### The Human Operating System: A Futuristic Biometric Intelligence & Optimization Platform

**WELLBEING_SENSINGG** is a high-performance wellness monitoring application that transforms a standard smartphone into a sophisticated clinical-grade biometric scanner. By leveraging **Photoplethysmography (PPG)**, **Computer Vision**, and **Neural AI**, it extracts deep physiological insights—Energy, Stress, HRV, and Blood Oxygen—using only the device's camera and flash.

---

## 📽️ Presentation Highlights

_Imagine a world where your phone doesn't just track your steps, but understands your internal state—detecting burnout before you feel it and suggesting somatic interventions in real-time._

### 🚀 The Innovation

1.  **Hardware-Agnostic Sensing**: Clinical-grade vitals without needing a $500 smartwatch.
2.  **Digital Twin Logic**: A real-time 3D React-Three-Fiber avatar that visually mirrors your nervous system's state.
3.  **Coherence AI**: A LLM-powered "Neural Analyst" that translates complex heart-rate variability data into actionable health advice.
4.  **Vagal Nerve Calibration**: Built-in somatic breathing tools to move users from "Stress" to "Flow" in minutes.

---

## 🔬 Scientific Justification: The Power of PPG

The cornerstone of this platform is **Photoplethysmography (PPG)**—the measurement of volumetric changes in blood circulation using light.

### 1. Volumetric Detection (Heart Rate)

When the heart pumps, a pressure wave expands the capillaries in your finger.

- **The Physics**: Red light from the LED flash penetrates the skin. Blood reflects/absorbs light differently than tissue.
- **Signal Extraction**: We process 60 FPS video. By calculating the **Average Red Pixel Intensity** of each frame, we create a time-series wave. The peaks of this wave correspond precisely to the heart's mechanical contractions.

### 2. Blood Oxygenation (SpO2) Logic

Oxygenated hemoglobin (HbO2) and deoxygenated hemoglobin (Hb) have different absorption properties for Red vs. Blue light.

- **Mechanism**: The app compares the AC (pulsatile) and DC (stationary) components of multiple color channels.
- **Calculation**: Using the **Ratio-of-Ratios** formula:
  $$SpO_2 = 110 - 25 \times \frac{(AC_{red} / DC_{red})}{(AC_{blue} / DC_{blue})}$$

### 3. Autonomic Analysis (HRV & Stress)

We don't just calculate Beats Per Minute (BPM); we capture **Heart Rate Variability (HRV)**—the millisecond-level difference between heartbeats (R-R Interval).

- **Parasympathetic Control**: High variability indicates a healthy, recovered state.
- **Sympathetic Control**: Constant, metronomic intervals indicate high stress (Fight/Flight).
- **Core Metric**: **RMSSD** (Root Mean Square of Successive Differences) is processed in real-time to generate your **Neural Stress Score**.

---

## 🛠️ System Architecture

### 🛡️ Layer 1: Data Acquisition (Frontend)

- **Engine**: React 18 + Vite (Luminous Light Theme).
- **Sensing**: WebRTC Camera Stream capturing raw pixel data.
- **Visuals**: Framer Motion & GSAP for 60FPS fluid UI; Three.js for the Digital Twin.

### 🧠 Layer 2: Processing Engine (Python Backend)

- **FastAPI**: High-performance asynchronous API layer.
- **CV Pipeline**: OpenCV processes the video stream to extract the signal baseline.
- **DSP (Digital Signal Processing)**:
  - **Butterworth Bandpass Filter**: Removes "noise" from finger movement.
  - **FFT (Fast Fourier Transform)**: Analyzes signal frequencies to isolate the pulse.
  - **Peak Detection**: Identifies exact timestamps of heart contractions.

### 💾 Layer 3: Intelligence & Persistence

- **AI Engine**: Scikit-Learn based models for anomaly detection and recovery-state prediction.
- **Persistence**: PostgreSQL (Prod) / SQLite (Dev) storing temporal health packets.

---

## 📜 Parameter Summary Table

| Parameter        | Sensing Method           | Biological Insight        |
| :--------------- | :----------------------- | :------------------------ |
| **Heart Rate**   | Red Pixel Intensity      | Primary Aerobic Status    |
| **SpO2**         | Multi-Channel Absorption | Respiratory Efficiency    |
| **Stress (HRV)** | R-R Interval Variance    | Autonomic Balance (ANS)   |
| **Energy Score** | Amplitude + HRV Ratio    | Total Metabolic Readiness |
| **Respiration**  | Baseline Wandering       | Somatic Breathing Depth   |

---

## 🔮 Roadmap: The Future of Neural Sensing

- **IoT Integration**: Direct BLE (Bluetooth Low Energy) sync with ESP32-based thermal and pulse nodes.
- **Facial PPG**: Measuring pulse via the front camera using microscopic skin-color changes (rPPG).
- **Predictive Burnout**: AI forecasting stress levels 24 hours in advance based on historical trends.

---

> **WELLBEING_SENSINGG** is not just an app; it is a bio-feedback ecosystem designed to bridge the gap between human physiology and digital intelligence.
