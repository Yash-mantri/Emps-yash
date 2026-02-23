import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const result = await apiRequest("/auth/login", "POST", { email, password });

    if (result.token) {
      localStorage.setItem("sessionToken", result.token);
      localStorage.setItem("role", result.role);
      localStorage.setItem("email", email);

      if (result.role === "admin") navigate("/admin");
      else navigate("/user");
    } else {
      alert("Login failed");
    }
  }

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <form onSubmit={handleLogin} className="p-4 border rounded w-50">
        <h3 className="text-center">Login</h3>
        <input
          type="text"
          placeholder="Email"
          className="form-control mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}