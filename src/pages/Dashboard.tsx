import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

interface schoolsProps {
  name: string;
}

export function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [schools, setSchools] = useState<schoolsProps[]>([] as schoolsProps[])

  useEffect(() => {
    api.get("/v1/escolas")
      .then((response) => setSchools(response.data.data));
  }, [])

  return (
    <>
      <h1>dashboard</h1>

      <Link to="/home">Home</Link>

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