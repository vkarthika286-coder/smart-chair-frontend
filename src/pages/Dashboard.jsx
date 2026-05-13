import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { getChairs, getSensorHistory } from "../services/api"

function Dashboard() {
  const { user, setUser } = useContext(UserContext)
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!user?.employee_id) return

    async function loadData() {
      try {
        const chairs = await getChairs()

        const chair = chairs.find(
          (c) =>
            c.current_employee_id === user.employee_id ||
            c.chair_id === user.assigned_chair_id
        )

        if (chair) {
          setUser((prevUser) => ({
            ...prevUser,
            ...chair
          }))
        }

        const historyData = await getSensorHistory(user.employee_id)
        setHistory(Array.isArray(historyData) ? historyData.slice(-5) : [])
      } catch (error) {
        console.error("Dashboard data loading failed:", error)
      }
    }

    loadData()
    const interval = setInterval(loadData, 10000)

    return () => clearInterval(interval)
  }, [user?.employee_id, user?.assigned_chair_id, setUser])

  if (!user) {
    return <h2>No Employee Logged In</h2>
  }

  const postureScore = user.current_posture_score || 0
  const heartRate = user.heart_rate || 0
  const temperature = user.temperature || 0
  const userState = user.current_user_state || "Loading"
  const postureStatus = user.posture_status || "Loading"
  const fanStatus = user.fan_status || "OFF"
  const vibrationAlert = user.vibration_alert || "OFF"
  const chairId = user.assigned_chair_id || user.chair_id || "-"
  const overallProductivity = user.productivity_score || 0
  const leftPressure = user.left_pressure || 0
  const rightPressure = user.right_pressure || 0
  const chairAction = user.chair_action || "Chair action loading"

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  const fixedWeeklyValues = [78, 82, 85, 88, 92]

  return (
    <>
      <div className="topbar">
        <h1>Smart Chair Dashboard</h1>
        <div className="clock">{new Date().toLocaleTimeString()}</div>
      </div>

      <div className="cards">
        <Card title="Posture Score" value={`${postureScore}%`} icon="🪑" blue />
        <Card title="Heart Rate" value={`${heartRate} BPM`} icon="❤" />
        <Card title="Temperature" value={`${temperature}°C`} icon="🌡️" />
        <Card title="User State" value={userState} icon="⭐" />
      </div>

      <div className="status-row">
        <Status title="Live Posture" value={postureStatus} color="green" />
        <Status title="Fan Status" value={fanStatus} color="blue-text" />
        <Status title="Vibration Alert" value={vibrationAlert} color="orange" />
        <Status title="Chair ID" value={chairId} color="green" />
      </div>

      <div className="content">
        <section className="box">
          <div className="box-title">
            <h3>Weekly Productivity</h3>
            <button>View Analytics</button>
          </div>

          <div className="bars">
            {weekDays.map((day, index) => {
              const item = history[index]

              const productivityValue = item?.productivity_score
                ? Number(item.productivity_score)
                : fixedWeeklyValues[index]

              return (
                <div className="bar-item" key={day}>
                  <div
                    className="bar"
                    style={{ height: `${productivityValue}%` }}
                  ></div>
                  <p>{day}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="box score">
          <div className="circle">{overallProductivity}%</div>
          <h3>Overall Productivity</h3>
          <p>
            {user.name} - {user.employee_id}
          </p>
        </section>
      </div>

      <div className="bottom-section">
        <section className="box">
          <h3>Pressure Balance Visualization</h3>

          <p>Left Pressure</p>
          <div className="pressure-bar">
            <span style={{ width: `${Math.min(leftPressure / 10, 100)}%` }}></span>
          </div>

          <p>Right Pressure</p>
          <div className="pressure-bar">
            <span style={{ width: `${Math.min(rightPressure / 10, 100)}%` }}></span>
          </div>
        </section>

        <section className="box">
          <h3>Notifications</h3>

          <div className="alerts">
            <p>🔔 Drink water reminder</p>
            <p>
              🔔{" "}
              {postureStatus === "Bad"
                ? "Bad posture detected"
                : "Posture normal"}
            </p>
            <p>🔔 {chairAction}</p>
          </div>
        </section>
      </div>
    </>
  )
}

function Card({ title, value, icon, blue }) {
  return (
    <div className={blue ? "card blue" : "card"}>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
      <span>{icon}</span>
    </div>
  )
}

function Status({ title, value, color }) {
  return (
    <div className="status-card">
      <p>{title}</p>
      <h3 className={color}>{value}</h3>
    </div>
  )
}

export default Dashboard