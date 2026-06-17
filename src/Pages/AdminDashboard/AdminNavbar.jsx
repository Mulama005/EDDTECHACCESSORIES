import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
  fetchUnread();

  const interval = setInterval(fetchUnread, 5000);

  const handleUpdate = () => fetchUnread();
  window.addEventListener("messagesUpdated", handleUpdate);

  return () => {
    clearInterval(interval);
    window.removeEventListener("messagesUpdated", handleUpdate);
  };
}, []);

  const fetchUnread = async () => {
    try {
      const res = await fetch("https://eddtechaccessories-backend.vercel.app/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      const unread = data.filter((msg) => !msg.is_read).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-navbar">
      <NavLink to="/admin/orders">Orders</NavLink>

      {/*  Messages with badge */}
      <NavLink to="/admin/messages" className="nav-with-badge">
        Messages
        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </NavLink>

      <NavLink to="/admin/campaigns">Campaigns</NavLink>
      
    </div>
  );
}
