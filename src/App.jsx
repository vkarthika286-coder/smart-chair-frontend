import { useContext } from "react"
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import EmployeeMonitoring from "./pages/EmployeeMonitoring"
import PostureAnalysis from "./pages/PostureAnalysis"
import Productivity from "./pages/Productivity"
import Alerts from "./pages/Alerts"
import Reports from "./pages/Reports"
import HRDashboard from "./pages/HRDashboard"

import { UserContext } from "./context/UserContext"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />

        <Route
          path="/*"
          element={
            <div className="dashboard">
              <aside className="sidebar">
                <SidebarProfile />

                <nav>
                  <Link to="/dashboard">🏠 Home</Link>
                  <Link to="/employee">👩‍💼 Employee</Link>
                  <Link to="/posture">🪑 Posture</Link>
                  <Link to="/productivity">📊 Productivity</Link>
                  <Link to="/alerts">⚠️ Alerts</Link>
                  <Link to="/reports">📄 Reports</Link>
                </nav>
              </aside>

              <main className="main">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employee" element={<EmployeeMonitoring />} />
                  <Route path="/posture" element={<PostureAnalysis />} />
                  <Route path="/productivity" element={<Productivity />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

function SidebarProfile() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate("/")
  }

  return (
    <div className="profile">
      <div className="avatar">👤</div>
      <h2>{user ? user.name : "Employee"}</h2>
      <p>{user ? user.employee_id : ""}</p>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default App