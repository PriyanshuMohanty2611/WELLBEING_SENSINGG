# 🧬 WELLBEING_SENSINGG

### The Human Optimization Engine: A Futuristic Biometric Intelligence Platform

**WELLBEING_SENSINGG** is a high-performance wellness monitoring platform that transforms your smartphone into a clinical-grade biometric scanner. Using advanced **Photoplethysmography (PPG)** and **Bio-Neural Intelligence**, it measures heart rate variability (HRV), stress, and energy levels to provide real-time recovery insights.

---

## 🔬 Scientific Foundation: How It Works

The core of this application is founded on the science of **Photoplethysmography (PPG)**. It captures the micro-variations of light absorption in your capillaries to detect biological signals.

### 1. Photoplethysmography (PPG) Logic

When you place your fingertip over the camera lens, the smartphone's LED flash illuminates the tissue.

- **The Physics**: Blood absorbs light more than the surrounding tissue.
- **Heart Rate**: Each heartbeat creates a "pressure wave" of blood in your finger, causing a measurable drop in light intensity.
- **The Signal**: We process 60 frames per second, calculating the average **Red-pixel intensity** to reconstruct your pulse waveform.

### 2. Blood Oxygen (SpO2) Detection

Oxygenated and deoxygenated hemoglobin have distinct absorption spectra.

- Using the **Ratio-of-Ratios** method, we compare the pulsatile (AC) and stationary (DC) components of the Red and Blue/Green channels.
- **Formula**: $$SpO_2 = 110 - 25 \times \frac{(AC_{red} / DC_{red})}{(AC_{blue} / DC_{blue})}$$

### 3. HRV & Neural Stress Analysis

We don't just count beats; we measure the **R-R Interval** (the time between heartbeats) in milliseconds.

- **Low HRV**: Indicates "Fight or Flight" dominance (High Stress).
- **High HRV**: Indicates Parasympathetic dominance (Rest & Recovery).
- **Metric**: We use **RMSSD** (Root Mean Square of Successive Differences), the gold standard in autonomic nervous system research.

---

## 🎨 Luminous Edition Features

- **3D Digital Twin**: A real-time 3D avatar that visually shifts its "aura" and pulse based on your measured stress and energy scores.
- **Somatic Calibration**: An interactive vagal nerve stimulation module using rhythmic breathing (4-4-6 pattern).
- **Coherence AI**: A neural analyst chat interface that uses LLM logic to interpret your biometrics and suggest somatic improvements.
- **Temporal Insights**: Advanced data visualization showing your recovery trends over days and weeks.

---

## 🛠️ Technical Architecture

### Backend (FastAPI + Python)

- **Signal Processing**: NumPy & SciPy for Butterworth filtering and Fast Fourier Transforms (FFT).
- **AI Engine**: Scikit-learn logic for health anomaly detection and stress prediction.
- **Database**: PostgreSQL (with SQLite local fallback).

### Frontend (React + Vite + Tailwind)

- **Visuals**: Framer Motion for neural animations, Three.js (React Three Fiber) for the 3D Digital Twin.
- **Analytics**: Recharts for temporal bio-data visualization.
- **UI/UX**: "Luminous Light" theme with a 2.5rem ergonomic corner radius and high-frequency vibrant icons.

---

## 🚀 Deployment (Render Blueprint)

This project is pre-configured for **Render** using a Blueprint (`render.yaml`).

1. Push to GitHub.
2. Select "New Blueprint Instance" on Render.
3. The system will automatically deploy the Python backend and React frontend.

---

### 📜 Parameter Summary

| Parameter        | Sensing Method          | Signal Logic                                 |
| :--------------- | :---------------------- | :------------------------------------------- |
| **Heart Rate**   | Red Pixel Intensity     | Peak detection in PPG waveform               |
| **SpO2**         | Dual-Channel Absorption | Ratio of Red vs. Blue light pulsatility      |
| **Stress (HRV)** | R-R Interval Analysis   | RMSSD calculation from millisecond variances |
| **Respiration**  | Baseline Wandering      | PPG wave "sway" during inhalation cycles     |

> **Disclaimer**: This application is for wellness and optimization purposes. For clinical diagnoses, always consult a medical professional.
