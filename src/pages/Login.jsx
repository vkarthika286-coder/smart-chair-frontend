import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { getEmployees } from "../services/api"
import { UserContext } from "../context/UserContext"

function Login() {
  const [role, setRole] = useState("employee")
  const [employeeId, setEmployeeId] = useState("")
  const [rfid, setRfid] = useState("")
  const [hrId, setHrId] = useState("")
  const [password, setPassword] = useState("")
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { setUser, setLoggedEmployeeId } = useContext(UserContext)

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getEmployees()
        setEmployees(Array.isArray(data) ? data : [])
      } catch (err) {
        setError("Backend not connected")
      }
    }

    loadEmployees()
  }, [])

  const handleEmployeeLogin = () => {
    const foundUser = employees.find(
      (emp) =>
        String(emp.employee_id).toUpperCase() ===
          employeeId.trim().toUpperCase() &&
        String(emp.rfid_tag).toUpperCase() ===
          rfid.trim().toUpperCase()
    )

    if (foundUser) {
      setUser(foundUser)
      setLoggedEmployeeId(foundUser.employee_id)
      navigate("/dashboard")
    } else {
      setError("Invalid Employee ID or RFID Tag")
    }
  }

  const handleHRLogin = () => {
    if (
      hrId.trim().toUpperCase() === "HR001" &&
      password.trim() === "admin123"
    ) {
      navigate("/hr-dashboard")
    } else {
      setError("Invalid HR credentials")
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Smart Chair Login</h1>

        <p className="login-subtitle">
          Employee Productivity Monitoring System
        </p>

        <div className="role-buttons">
          <button
            className={role === "employee" ? "active-role" : ""}
            onClick={() => {
              setRole("employee")
              setError("")
            }}
          >
            Employee Login
          </button>

          <button
            className={role === "hr" ? "active-role" : ""}
            onClick={() => {
              setRole("hr")
              setError("")
            }}
          >
            HR Login
          </button>
        </div>

        {role === "employee" ? (
          <>
            <input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />

            <input
              type="text"
              placeholder="RFID Tag ID"
              value={rfid}
              onChange={(e) => setRfid(e.target.value)}
            />

            <button onClick={handleEmployeeLogin}>Login</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="HR ID"
              value={hrId}
              onChange={(e) => setHrId(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="hr-btn" onClick={handleHRLogin}>
              HR Login
            </button>
          </>
        )}

        {error && (
          <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default Login