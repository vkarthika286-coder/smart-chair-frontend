const API_URL = "https://smart-chair-backend.onrender.com"

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error("API request failed")
  }

  return await res.json()
}

export async function getEmployees() {
  const res = await fetch(`${API_URL}/employees`)
  return handleResponse(res)
}

export async function getChairs() {
  const res = await fetch(`${API_URL}/chairs`)
  return handleResponse(res)
}

export async function getSensorHistory(employeeId) {
  const res = await fetch(`${API_URL}/sensor-history/${employeeId}`)
  return handleResponse(res)
}

export async function addEmployee(employeeData) {
  const res = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData)
  })

  return handleResponse(res)
}

export async function assignChair(assignmentData) {
  const res = await fetch(`${API_URL}/assign-chair`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assignmentData)
  })

  return handleResponse(res)
}