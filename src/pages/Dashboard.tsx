import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { api } from "../services/api";

interface schoolsProps {
  name: string;
}

export function Dashboard() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [schools, setSchools] = useState<schoolsProps[]>([] as schoolsProps[])

  useEffect(() => {
    api.get("/v1/escolas")
      .then((response) => setSchools(response.data.data));
  }, [])

  return (
    <>
      <h1>dashboard</h1>

      {schools?.map(school => (
        <p 
          key={school.name} 
          style={{ 
            background: "red", 
            margin: "1rem" 
          }}
        >
          {school.name}
        </p>
      ))}

      {isAuthenticated ? (
        <p>{user?.email}</p>
      ) : (
        <p>usuário não logado</p>
      )}
    </>
  )
}