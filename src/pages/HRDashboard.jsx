import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

import {
  getEmployees,
  getChairs,
  addEmployee,
  assignChair
} from "../services/api"

import { UserContext } from "../context/UserContext"

function HRDashboard() {
  const [employees, setEmployees] = useState([])
  const [chairs, setChairs] = useState([])
  const [employeeId, setEmployeeId] = useState("")
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const [newEmployee, setNewEmployee] = useState({
    employee_id: "",
    name: "",
    rfid_tag: "",
    department: "",
    height_cm: "",
    weight_kg: "",
    assigned_chair_id: ""
  })

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    loadData()

    const interval = setInterval(loadData, 10000)

    return () => clearInterval(interval)
  }, [])

  async function loadData() {
    try {
      const employeeData = await getEmployees()
      const chairData = await getChairs()

      setEmployees(Array.isArray(employeeData) ? employeeData : [])
      setChairs(Array.isArray(chairData) ? chairData : [])
    } catch (error) {
      console.error("Error loading HR data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateIds = () => {
    const nextNumber = employees.length + 1

    setNewEmployee({
      employee_id: `EMP${String(nextNumber).padStart(3, "0")}`,
      name: "",
      rfid_tag: `RFID${String(nextNumber).padStart(3, "0")}`,
      department: "",
      height_cm: "",
      weight_kg: "",
      assigned_chair_id: ""
    })

    setShowModal(true)
  }

  const handleNewEmployeeChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value
    })
  }

  const handleAddEmployee = async () => {
    if (
      !newEmployee.name ||
      !newEmployee.department ||
      !newEmployee.height_cm ||
      !newEmployee.weight_kg ||
      !newEmployee.assigned_chair_id
    ) {
      alert("Please fill all details")
      return
    }

    try {
      await addEmployee({
        ...newEmployee,
        height_cm: Number(newEmployee.height_cm),
        weight_kg: Number(newEmployee.weight_kg)
      })

      await assignChair({
        employee_id: newEmployee.employee_id,
        rfid_tag: newEmployee.rfid_tag,
        chair_id: newEmployee.assigned_chair_id
      })

      alert("Employee added successfully")

      setShowModal(false)
      loadData()
    } catch (error) {
      console.error(error)
      alert("Failed to add employee. Check duplicate employee/RFID or chair ID.")
    }
  }

  const mergedEmployees = employees.map((emp) => {
    const chairData = chairs.find(
      (chair) =>
        String(chair.current_employee_id).toUpperCase() ===
        String(emp.employee_id).toUpperCase()
    )

    return {
      ...emp,
      ...(chairData || {})
    }
  })

  const stateData = [
    {
      name: "Focused",
      value: mergedEmployees.filter((e) => e.current_user_state === "Focused").length
    },
    {
      name: "Relaxed",
      value: mergedEmployees.filter((e) => e.current_user_state === "Relaxed").length
    },
    {
      name: "Determined",
      value: mergedEmployees.filter((e) => e.current_user_state === "Determined").length
    },
    {
      name: "Stressed",
      value: mergedEmployees.filter((e) => e.current_user_state === "Stressed").length
    },
    {
      name: "Tensed",
      value: mergedEmployees.filter((e) => e.current_user_state === "Tensed").length
    }
  ]

  const COLORS = ["#16a34a", "#2563eb", "#9333ea", "#dc2626", "#f97316"]

  const openEmployeeDashboard = () => {
    const emp = mergedEmployees.find(
      (e) =>
        String(e.employee_id).toUpperCase() ===
        employeeId.trim().toUpperCase()
    )

    if (emp) {
      setUser(emp)
      navigate("/dashboard")
    } else {
      alert("Employee not found")
    }
  }

const generateDailyReport = () => {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text("Daily Employee Monitoring Report", 14, 20)

  doc.setFontSize(12)
  doc.text(`Total Employees: ${mergedEmployees.length}`, 14, 32)

  autoTable(doc, {
    startY: 40,
    head: [
      [
        "Employee ID",
        "Name",
        "Chair ID",
        "State",
        "Posture Score",
        "Productivity"
      ]
    ],
    body: mergedEmployees.map((emp) => [
      emp.employee_id || "-",
      emp.name || "-",
      emp.assigned_chair_id || emp.chair_id || "-",
      emp.current_user_state || "-",
      emp.current_posture_score ? `${emp.current_posture_score}%` : "-",
      emp.productivity_score ? `${emp.productivity_score}%` : "-"
    ])
  })

  let y = doc.lastAutoTable.finalY + 20

  doc.setFontSize(15)
  doc.text("Productivity Graph", 14, y)

  y += 10

  mergedEmployees.forEach((emp, index) => {
    const productivity = Number(emp.productivity_score) || 0
    const barWidth = productivity * 1.5
    const barY = y + index * 12

    doc.setFontSize(10)
    doc.text(emp.employee_id || "-", 14, barY + 5)

    doc.rect(40, barY, 150, 7)
    doc.rect(40, barY, barWidth, 7, "F")

    doc.text(`${productivity}%`, 195, barY + 5)
  })

  doc.save("Daily_Report_With_Productivity_Graph.pdf")
}

const generateOverallMonthlyReport = () => {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text("Overall Monthly Productivity Report", 14, 20)

  doc.setFontSize(12)
  doc.text(`Total Employees: ${mergedEmployees.length}`, 14, 32)

  autoTable(doc, {
    startY: 40,
    head: [
      [
        "Employee ID",
        "Name",
        "Chair ID",
        "Avg Posture",
        "Avg Productivity",
        "Current State"
      ]
    ],
    body: mergedEmployees.map((emp) => [
      emp.employee_id || "-",
      emp.name || "-",
      emp.assigned_chair_id || emp.chair_id || "-",
      emp.current_posture_score ? `${emp.current_posture_score}%` : "-",
      emp.productivity_score ? `${emp.productivity_score}%` : "-",
      emp.current_user_state || "-"
    ])
  })

  let y = doc.lastAutoTable.finalY + 20

  doc.setFontSize(15)
  doc.text("Monthly Productivity Graph", 14, y)

  y += 10

  mergedEmployees.forEach((emp, index) => {
    const productivity = Number(emp.productivity_score) || 0
    const barWidth = productivity * 1.5
    const barY = y + index * 12

    doc.setFontSize(10)
    doc.text(emp.employee_id || "-", 14, barY + 5)

    doc.rect(45, barY, 150, 7)
    doc.rect(45, barY, barWidth, 7, "F")

    doc.text(`${productivity}%`, 200, barY + 5)
  })

  doc.save("Monthly_Productivity_Report_With_Graph.pdf")
}

  const handleLogout = () => {
    setUser(null)
    navigate("/")
  }

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading HR Dashboard...</h2>
  }

  return (
    <div>
      <div className="top-header">
        <h1 className="page-heading">HR Monitoring Dashboard</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="hr-summary">
        <div className="hr-summary-card">
          <p>Total Employees</p>
          <h2>{mergedEmployees.length}</h2>
        </div>

        {stateData.map((item) => (
          <div className="hr-summary-card" key={item.name}>
            <p>{item.name}</p>
            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      <section className="box">
        <h3>Employee State Analysis</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stateData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {stateData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section className="box">
        <h3>Employee Actions</h3>

        <div className="hr-search-row">
          <button className="view-btn" onClick={generateIds}>
            Add Employee
          </button>

          <input
            type="text"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <button className="view-btn" onClick={openEmployeeDashboard}>
            View Dashboard
          </button>

          <button className="view-btn" onClick={generateDailyReport}>
            Daily Report
          </button>

          <button className="view-btn" onClick={generateOverallMonthlyReport}>
            Overall Monthly Report
          </button>
        </div>
      </section>

      <section className="box">
        <h3>Live Employee Monitoring</h3>

        {mergedEmployees.length === 0 ? (
          <p>No employee data found. Check backend API.</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>RFID</th>
                <th>Chair ID</th>
                <th>State</th>
                <th>Posture Score</th>
                <th>Productivity</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {mergedEmployees.map((emp) => (
                <tr key={emp.employee_id}>
                  <td>{emp.name || "-"}</td>
                  <td>{emp.employee_id || "-"}</td>
                  <td>{emp.rfid_tag || emp.current_rfid || "-"}</td>
                  <td>{emp.assigned_chair_id || emp.chair_id || "-"}</td>
                  <td>{emp.current_user_state || "-"}</td>
                  <td>
                    {emp.current_posture_score
                      ? `${emp.current_posture_score}%`
                      : "-"}
                  </td>
                  <td>
                    {emp.productivity_score
                      ? `${emp.productivity_score}%`
                      : "-"}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => {
                        setUser(emp)
                        navigate("/dashboard")
                      }}
                    >
                      View Dashboard
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Employee</h3>

            <input
              type="text"
              value={newEmployee.employee_id}
              readOnly
              placeholder="Employee ID"
            />

            <input
              type="text"
              value={newEmployee.rfid_tag}
              readOnly
              placeholder="RFID Tag"
            />

            <input
              name="name"
              type="text"
              placeholder="Employee Name"
              value={newEmployee.name}
              onChange={handleNewEmployeeChange}
            />

            <input
              name="department"
              type="text"
              placeholder="Department"
              value={newEmployee.department}
              onChange={handleNewEmployeeChange}
            />

            <input
              name="height_cm"
              type="number"
              placeholder="Height in cm"
              value={newEmployee.height_cm}
              onChange={handleNewEmployeeChange}
            />

            <input
              name="weight_kg"
              type="number"
              placeholder="Weight in kg"
              value={newEmployee.weight_kg}
              onChange={handleNewEmployeeChange}
            />

            <input
              name="assigned_chair_id"
              type="text"
              placeholder="Chair ID example: CHAIR003"
              value={newEmployee.assigned_chair_id}
              onChange={handleNewEmployeeChange}
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button className="view-btn" onClick={handleAddEmployee}>
                Save Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRDashboard