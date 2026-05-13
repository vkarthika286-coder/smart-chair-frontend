import { ref, set } from "firebase/database"
import { database } from "./firebase"
import { employees } from "../data/employees"

export function uploadEmployees() {
  set(ref(database, "employees"), employees)
    .then(() => {
      alert("Employees uploaded to Firebase successfully")
    })
    .catch((error) => {
      alert("Upload failed: " + error.message)
    })
}