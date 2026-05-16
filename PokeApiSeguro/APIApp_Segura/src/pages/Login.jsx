import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login({ setIsAuth }) {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      await login(form);
      setIsAuth(true);
      nav("/home");
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={e => setForm({...form, username: e.target.value})} />
      <input type="password" onChange={e => setForm({...form, password: e.target.value})} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
