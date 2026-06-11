import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const stats = [
  { label: "Projects", value: 1 },
  { label: "Tasks Done", value: 0 },
  { label: "Messages", value: 5 },
  { label: "Days Active", value: 1 },
];

const activity = [
  { text: "Signed in successfully", dot: "blue" },
  { text: "Dashboard loaded", dot: "purple" },
];

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("userName");
    if (!token || !stored) {
      navigate("/signin");
    } else {
      setName(stored);
    }
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/signin");
  }

  return (
    <div className="dash-root">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">◆</span>
          <span className="logo-text">Nexus</span>
        </div>
        <nav className="sidebar-nav">
          <a className="nav-item active" href="#">Dashboard</a>
          <a className="nav-item" href="#">Projects</a>
          <a className="nav-item" href="#">Tasks</a>
          <a className="nav-item" href="#">Messages</a>
          <a className="nav-item" href="#">Settings</a>
        </nav>
        <div className="sidebar-footer">
          <div className="user-row">
            <div className="avatar">{name ? getInitials(name) : "?"}</div>
            <div className="user-info">
              <div className="user-name">{name}</div>
              <div className="user-role">Member</div>
            </div>
          </div>
          <button className="signout-btn" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1 className="greeting">
              {getGreeting()}, {name.split(" ")[0]}
            </h1>
            <p className="greeting-sub">Here's what's happening today.</p>
          </div>
          <div className="topbar-right">
            <button className="topbar-signout" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </section>

        <div className="lower-grid">
          <section className="card">
            <h2 className="card-title">Recent Activity</h2>
            <ul className="activity-list">
              {activity.map((a, i) => (
                <li className="activity-item" key={i}>
                  <span className={`dot dot-${a.dot}`}></span>
                  <span className="activity-text">{a.text}</span>
                  <span className="activity-time">{a.time}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2 className="card-title">Quick Actions</h2>
            <div className="actions-list">
              <button className="action-btn">+ New Project</button>
              <button className="action-btn">View Tasks</button>
              <button className="action-btn">Send Message</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
