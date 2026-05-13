import { useContext } from "react"
import { UserContext } from "../context/UserContext"

function EmployeeMonitoring() {
  const { user } = useContext(UserContext)

  if (!user) {
    return <h2>No Employee Logged In</h2>
  }

  return (
    <div>
      <h1 className="page-heading">Employee Details</h1>

      <div className="employee-profile-grid">
        <section className="employee-main-card">
          <div className="employee-avatar">👤</div>

          <h2>{user.name || "Employee"}</h2>
          <p>{user.current_user_state || "Loading"}</p>
        </section>

        <section className="employee-info-card">
          <h3>Employee Information</h3>

          <div className="info-row">
            <span>Employee ID</span>
            <b>{user.employee_id || "-"}</b>
          </div>

          <div className="info-row">
            <span>RFID Tag ID</span>
            <b>{user.rfid_tag || user.current_rfid || "-"}</b>
          </div>

          <div className="info-row">
            <span>Department</span>
            <b>{user.department || "-"}</b>
          </div>

          <div className="info-row">
            <span>Chair ID</span>
            <b>{user.assigned_chair_id || user.chair_id || "-"}</b>
          </div>
        </section>

        <section className="employee-stat-card">
          <h3>Today's Status</h3>

          <p className="status-good">
            {user.current_user_state || "Loading"}
          </p>

          <p>Posture Score: {user.current_posture_score || 0}%</p>
          <p>Heart Rate: {user.heart_rate || 0} BPM</p>
          <p>Temperature: {user.temperature || 0}°C</p>
        </section>

        <section className="employee-stat-card">
          <h3>Chair Monitoring</h3>

          <p>Fan Status: {user.fan_status || "OFF"}</p>
          <p>Vibration Alert: {user.vibration_alert || "OFF"}</p>
          <p>Left Pressure: {user.left_pressure || 0}</p>
          <p>Right Pressure: {user.right_pressure || 0}</p>
        </section>
      </div>
    </div>
  )
}

export default EmployeeMonitoring