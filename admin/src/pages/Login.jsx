import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, errMessage, setToken } from "../api/client.js";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", { username, password });
      setToken(data.token);
      navigate("/", { replace: true });
    } catch (err) {
      setError(errMessage(err, "Unable to log in."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <div className="login-head">
          <span className="brand-mark">J</span>
          <h1>JAEMS Admin</h1>
          <p>Sign in to manage the site.</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <label className="field">
          <span>Username</span>
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}