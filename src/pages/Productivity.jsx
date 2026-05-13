import { useEffect, useState, useContext } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

import { UserContext } from "../context/UserContext"
import { getSensorHistory } from "../services/api"

function Productivity() {
  const { user } = useContext(UserContext)
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!user?.employee_id) return

    loadHistory()

    const interval = setInterval(() => {
      loadHistory()
    }, 10000)

    return () => clearInterval(interval)
  }, [user?.employee_id])

  async function loadHistory() {
    try {
      const data = await getSensorHistory(user.employee_id)
      setHistory(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("History loading failed:", error)
    }
  }

  if (!user) {
    return <h2>No Employee Logged In</h2>
  }

  const trendData =
    history.length > 0
      ? history.map((item, index) => ({
          time: `R${index + 1}`,
          posture: Number(item.posture_score) || 0,
          heart: Number(item.heart_rate) || 0,
          productivity: Number(item.productivity_score) || 0,
          temp: Number(item.temperature) || 0
        }))
      : [
          {
            time: "Now",
            posture: Number(user.current_posture_score) || 0,
            heart: Number(user.heart_rate) || 0,
            productivity: Number(user.productivity_score) || 0,
            temp: Number(user.temperature) || 0
          }
        ]

  const leftPressure = Number(user.left_pressure) || 50
  const rightPressure = Number(user.right_pressure) || 50

  const pressureData = [
    { name: "Left", value: leftPressure },
    { name: "Right", value: rightPressure }
  ]

  return (
    <div>
      <h1 className="page-heading">Productivity Graphs & Sensor Trends</h1>

      <div className="graph-grid">
        <GraphBox title="Posture Score vs Time">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 120]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="posture"
                stroke="#0b3558"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphBox>

        <GraphBox title="Heart Rate vs Time">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 140]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="heart"
                stroke="orange"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphBox>

        <GraphBox title="Daily Productivity Trend">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 120]} />
              <Tooltip />
              <Bar dataKey="productivity" fill="#0b3558" />
            </BarChart>
          </ResponsiveContainer>
        </GraphBox>

        <GraphBox title="Pressure Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pressureData}
                dataKey="value"
                nameKey="name"
                outerRadius={85}
                label
              >
                <Cell fill="#0b3558" />
                <Cell fill="orange" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <p>Left Pressure: {leftPressure}</p>
          <p>Right Pressure: {rightPressure}</p>
        </GraphBox>

        <GraphBox title="Temperature Graph">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 50]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="red"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphBox>
      </div>
    </div>
  )
}

function GraphBox({ title, children }) {
  return (
    <section className="box">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

export default Productivity