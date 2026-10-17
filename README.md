# ERGO NOVA AI 🪑
### AI-Enabled Smart Ergonomic Chair for Employee Well-being and Productivity Monitoring

**ERGO NOVA AI** is an AI-enabled smart ergonomic chair designed to monitor employee sitting posture, improve workplace comfort, and support employee well-being. By integrating sensors, RFID technology, automatic ergonomic adjustments, and a web-based dashboard, the system aims to make conventional office seating smarter and more responsive.

**Patent Application No.: 202641064060**

---

## 📌 Problem Statement

Employees spend 7–8 hours daily sitting at workstations. Prolonged sitting and poor posture can contribute to back pain, discomfort, fatigue, and reduced workplace productivity. Conventional office chairs provide physical support but generally lack real-time posture monitoring, personalized feedback, and connected workplace analytics.

ERGO NOVA AI addresses these challenges through an integrated smart-chair system.

## 🎯 Objectives

- Monitor sitting posture and pressure distribution in real time.
- Identify employees using RFID technology.
- Detect poor posture and provide vibration alerts.
- Automatically adjust lumbar and footrest support.
- Monitor selected well-being parameters, including heart rate and temperature.
- Track water-bottle weight to support hydration reminders.
- Display sensor readings, alerts, and analytics through a web dashboard.

## ✨ Key Features

- **Real-Time Posture Monitoring:** Uses Flex, MPU6050, and FSR sensors to analyze sitting posture and pressure distribution.
- **RFID-Based Identification:** Identifies employees using the RC522 RFID reader.
- **Posture Alerts:** Provides vibration feedback when poor posture is detected.
- **Automatic Ergonomic Adjustment:** Uses linear actuators to adjust lumbar and footrest support.
- **Temperature-Based Cooling:** Uses temperature sensing to support automatic fan control.
- **Heart-Rate Monitoring:** Integrates the MAX30102 sensor to collect heart-rate data.
- **Hydration Monitoring:** Uses a load cell to detect changes in water-bottle weight and support hydration reminders.
- **Web Dashboard:** Displays employee-related readings, alerts, and reports using a connected software platform.

## ⚙️ Hardware Components

| Component | Purpose |
|---|---|
| Arduino Mega 2560 | Main controller for sensor data and control operations |
| MPU6050 | Measures body tilt and movement |
| Flex Sensor | Detects spine bending |
| FSR Pressure Sensors | Detect sitting presence and pressure distribution |
| RC522 RFID Module | Employee identification |
| MAX30102 | Heart-rate monitoring |
| DHT11 | Temperature and humidity sensing |
| Linear Actuators | Lumbar and footrest adjustment |
| Potentiometer | Measures actuator position |
| Load Cell with HX711 | Monitors water-bottle weight |
| Vibration Motors | Provides posture alerts |
| Cooling Fans | Supports chair ventilation |

## 💻 Software and Technologies

- **Embedded Programming:** Arduino IDE / C++
- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MySQL
- **Communication:** Sensor interfaces and serial communication
- **Analytics:** Sensor-based posture analysis and dashboard reporting

## 🔄 System Workflow

1. The employee taps an RFID card near the RC522 reader.
2. The system identifies the employee and loads the relevant profile.
3. Sensors collect posture, pressure, temperature, and other supported measurements.
4. The controller processes sensor readings and calculates a posture score.
5. If poor posture is detected, the chair provides a vibration alert and controls the ergonomic adjustment mechanisms according to the programmed logic.
6. Temperature readings can control the cooling fans.
7. Water-bottle weight changes support hydration monitoring and reminders.
8. Relevant data is stored in the database and displayed on the web dashboard.

**System Flow:**

`RFID Identification → Sensor Monitoring → Posture Analysis → Ergonomic Adjustment → Alerts & Cooling → Hydration Monitoring → Database → Web Dashboard`

## 🧠 Posture Analysis

The system combines Flex sensor readings, body-tilt measurements, and pressure information to assess sitting posture.

The documented posture-score model uses the following weights:

- Flex score: 40%
- Tilt score: 40%
- Pressure-balance score: 20%

The resulting score is classified into posture categories according to the configured thresholds.

*Note: Sensor calibration and score normalization are essential for reliable classification. The final implementation should use validated formulas and thresholds.*

## 🏢 Applications

- Corporate offices and IT companies
- Employee wellness programs
- Educational institutions
- Healthcare and administrative workstations
- Smart offices and connected workplaces

## 💡 Innovation and Uniqueness

ERGO NOVA AI combines multiple functions in one ergonomic chair:

- Employee identification through RFID
- Multi-sensor posture monitoring
- Real-time corrective feedback
- Automatic ergonomic support adjustment
- Well-being and hydration monitoring
- Centralized web-based analytics

This integrated approach aims to go beyond conventional office chairs by combining physical ergonomic support with sensor-based monitoring and digital insights.

## 📊 Prototype Status

A working prototype has been developed with integrated chair hardware and a React.js / Node.js monitoring dashboard.

Further testing can focus on sensor accuracy, posture classification, actuator safety, hydration tracking, dashboard reliability, and user experience.

## 🚀 Future Scope

- Improve posture classification and personalization.
- Enhance AI-based analysis using validated user data.
- Add mobile notifications and cloud-based monitoring.
- Support multiple chairs and centralized organizational dashboards.
- Conduct pilot testing in real workplace environments.
- Optimize manufacturing cost and prepare for commercial deployment.

## 📄 Intellectual Property

**Patent Application No.: 202641064060**

## 🤝 Contributions

Suggestions and contributions to improve the prototype, sensor calibration, embedded programming, dashboard development, and testing are welcome. Please open an issue or submit a pull request with a clear description of the proposed change.

## ⚠️ Disclaimer

ERGO NOVA AI is a workplace ergonomics and monitoring prototype. Its sensor readings are intended to support comfort and awareness and should not be treated as medical diagnoses or definitive measurements of employee productivity.

---

**ERGO NOVA AI — Smarter Seating. Healthier Workplaces.**
