import { createContext, useState } from "react"

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loggedEmployeeId, setLoggedEmployeeId] = useState(null)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loggedEmployeeId,
        setLoggedEmployeeId
      }}
    >
      {children}
    </UserContext.Provider>
  )
}