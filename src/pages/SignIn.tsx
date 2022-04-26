import { useState, FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const [email, setEmail] = useState("eng.franciscodias@gmail.com");
  const [password, setPassword] = useState("@Af1234567");

  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { email, password };
    await signIn(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input 
        type="text" 
        placeholder="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  )
}