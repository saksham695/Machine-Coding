import React, { useState } from "react";
import { validateLogin } from "../constants/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const user = validateLogin(username, password);
    if (user) {
      localStorage.setItem("dobaara_user", JSON.stringify(user));
      window.location.hash = "#/profile";
    } else {
      setError("Invalid credentials. Try ariel/love123 or rohan/pass123");
    }
  };

  return (
    <div className="db-container">
      <div className="db-topbar">
        <div>
          <div className="db-brand">Dobaara</div>
          <div className="db-tagline">Made for Each Other, Beyond Heavens</div>
        </div>
      </div>

      <div className="db-card db-card-pad" style={{maxWidth: 480, margin: '24px auto'}}>
        <h2 className="db-title">Welcome back</h2>
        <p className="db-sub">Sign in to continue</p>
        <form onSubmit={onSubmit} className="db-list">
          <input className="db-input" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <input className="db-input" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          {error && <div style={{color:'#b91c1c', fontWeight:600}}>{error}</div>}
          <div className="db-actions">
            <button className="db-btn db-btn-primary" type="submit">Login</button>
            <a className="db-btn db-btn-ghost" href="#/">Back</a>
          </div>
        </form>
      </div>
    </div>
  );
} 