import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Broadcast from "../../components/Broadcast";
import CampaignHistory from "./CampaignHistory";
import AdminMessages from "./AdminMessages"; 
import "./AdminOrders.css";

export default function AdminCampaigns() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("new"); // "new" | "history"

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-page">

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">EDD TECH</span>
          <span className="admin-sidebar__sub">Admin Panel</span>
        </div>

        <nav className="admin-sidebar__nav">
          <button className="admin-nav-item" onClick={() => navigate("/admin/orders")}>
            📦 Orders
          </button>

          {/* Campaign sub-nav */}
          <div className="admin-nav-group">
            <span className="admin-nav-group__label">📢 Campaigns</span>
            <button
              className={`admin-nav-item admin-nav-item--sub ${activeView === "new" ? "admin-nav-item--active" : ""}`}
              onClick={() => setActiveView("new")}
            >
              ✉️ New Campaign
            </button>
            <button
              className={`admin-nav-item admin-nav-item--sub ${activeView === "history" ? "admin-nav-item--active" : ""}`}
              onClick={() => setActiveView("history")}
            >
              🕒 Campaign History
            </button>
          </div>

            <button
            className={`admin-nav-item admin-nav-item--sub ${
                activeView === "messages" ? "admin-nav-item--active" : ""
            }`}
            onClick={() => setActiveView("messages")}
            >
                💬 Customer Messages
            </button>

             

          <button className="admin-nav-item" onClick={() => navigate("/")}>
            🏠 View Store
          </button>
        </nav>

        <div className="admin-sidebar__footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">

        {activeView === "new" && (
          <>
            <div className="admin-topbar">
              <div>
                <h1 className="admin-topbar__title">New Campaign</h1>
                <p className="admin-topbar__subtitle">
                  Create and send a marketing email to your subscribers
                </p>
              </div>
            </div>
            <Broadcast onSent={() => setActiveView("history")} />
          </>
        )}

        {activeView === "history" && (
          <>
            <div className="admin-topbar">
              <div>
                <h1 className="admin-topbar__title">Campaign History</h1>
                <p className="admin-topbar__subtitle">
                  All campaigns sent to your subscribers
                </p>
              </div>
              <button
                className="admin-refresh-btn"
                onClick={() => setActiveView("new")}
              >
                ✉️ New Campaign
              </button>
            </div>
            <CampaignHistory />
          </>
        )}

        {activeView === "messages" && (
        <>
            <div className="admin-topbar">
                <div>
                    <h1 className="admin-topbar__title">Customer Messages</h1>
                    <p className="admin-topbar__subtitle">
                        View and manage messages from customers
                    </p>
                </div>
            </div>
            <AdminMessages />
        </>)}


      </main>
    </div>
  );
}