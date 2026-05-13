import { useContext } from "react"
import { UserContext } from "../context/UserContext"

function Reports() {
  const { user } = useContext(UserContext)

  if (!user) {
    return <h2>No Employee Logged In</h2>
  }

  const productivity = user.productivity_score || 0
  const postureStatus = user.posture_status || "Good"
  const heartRate = user.heart_rate || 0
  const temperature = user.temperature || 0
  const leftPressure = user.left_pressure || 50
  const rightPressure = user.right_pressure || 50
  const sittingDuration = user.sitting_duration || "0 Hours"
  const fanStatus = user.fan_status || "OFF"
  const vibrationAlert = user.vibration_alert || "OFF"

  const pressureDifference = Math.abs(leftPressure - rightPressure)
  const pressureBalance =
    pressureDifference <= 100 ? "Balanced" : "Imbalanced"

  const performanceText =
    productivity >= 85
      ? "Excellent Employee Performance"
      : productivity >= 70
      ? "Good Employee Performance"
      : "Needs Improvement"

  return (
    <div>
      <h1 className="page-heading">Employee Performance Reports</h1>

      <div className="reports-grid">
        <section className="report-card main-report">
          <h2>Overall Productivity</h2>

          <div className="report-circle">
            <span>{productivity}%</span>
          </div>

          <p>{performanceText}</p>
        </section>

        <section className="report-card">
          <h3>Daily Summary</h3>

          <div className="report-item">
            <span>Posture Quality</span>
            <b>{postureStatus}</b>
          </div>

          <div className="report-item">
            <span>Heart Rate</span>
            <b>{heartRate} BPM</b>
          </div>

          <div className="report-item">
            <span>Temperature</span>
            <b>{temperature}°C</b>
          </div>

          <div className="report-item">
            <span>Pressure Balance</span>
            <b>{pressureBalance}</b>
          </div>
        </section>

        <section className="report-card">
          <h3>Activity Report</h3>

          <div className="activity-box green-box">
            Sitting Duration: {sittingDuration}
          </div>

          <div className="activity-box orange-box">
            Water Reminders Sent: 4
          </div>

          <div className="activity-box blue-box">
            Posture Corrections: {postureStatus === "Bad" ? 2 : 0}
          </div>
        </section>

        <section className="report-card">
          <h3>System Notifications</h3>

          <div className="notification-item">
            ✅ Employee posture: {postureStatus}
          </div>

          <div className="notification-item">
            ⚠️ Vibration Alert: {vibrationAlert}
          </div>

          <div className="notification-item">
            💧 Water reminder generated
          </div>

          <div className="notification-item">
            🌬️ Ventilation Fan: {fanStatus}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Reports