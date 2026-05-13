import { useContext } from "react"
import { UserContext } from "../context/UserContext"

function Alerts() {
  const { user } = useContext(UserContext)

  if (!user) {
    return <h2>No Employee Logged In</h2>
  }

  const postureStatus = user.posture_status || "Good"
  const temperature = Number(user.temperature) || 0
  const fanStatus = user.fan_status || "OFF"
  const vibrationAlert = user.vibration_alert || "OFF"
  const leftPressure = Number(user.left_pressure) || 50
  const rightPressure = Number(user.right_pressure) || 50

  const pressureDifference = Math.abs(leftPressure - rightPressure)

  return (
    <div>
      <h1 className="page-heading">Alerts & Notifications</h1>

      <div className="alerts-page-grid">
        <AlertCard
          icon="💧"
          title="Water Reminder"
          message="Drink water now to stay hydrated."
          type="info"
        />

        <AlertCard
          icon="🪑"
          title="Posture Status"
          message={
            postureStatus === "Bad"
              ? "Bad posture detected. Please sit straight."
              : "Posture is normal."
          }
          type={postureStatus === "Bad" ? "danger" : "success"}
        />

        <AlertCard
          icon="🔄"
          title="Pressure Balance"
          message={
            pressureDifference > 100
              ? "Pressure imbalance detected. Adjust your sitting position."
              : "Pressure balance is normal."
          }
          type={pressureDifference > 100 ? "warning" : "success"}
        />

        <AlertCard
          icon="🌬️"
          title="Fan Status"
          message={`Seat ventilation fan is ${fanStatus}.`}
          type={fanStatus === "ON" ? "success" : "info"}
        />

        <AlertCard
          icon="📳"
          title="Vibration Alert"
          message={`Vibration alert is ${vibrationAlert}.`}
          type={vibrationAlert === "ON" ? "danger" : "success"}
        />

        <AlertCard
          icon="🌡️"
          title="Temperature Status"
          message={
            temperature > 32
              ? `Temperature is high: ${temperature}°C. Fan should be ON.`
              : `Temperature is normal: ${temperature}°C.`
          }
          type={temperature > 32 ? "warning" : "success"}
        />
      </div>
    </div>
  )
}

function AlertCard({ icon, title, message, type }) {
  return (
    <section className={`alert-card ${type}`}>
      <div className="alert-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </section>
  )
}

export default Alerts