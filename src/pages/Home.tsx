import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <h1>home</h1>
      <Link to="/dashboard">dashboard</Link>
    </>
  )
}