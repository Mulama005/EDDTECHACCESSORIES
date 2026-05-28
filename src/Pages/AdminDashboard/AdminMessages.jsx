import { useEffect, useState } from "react";
import "./AdminMessages.css";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | unread | read
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchMessages();
  }, []);

  // FETCH MESSAGES
  const fetchMessages = async () => {
    try {
      const res = await fetch("https://eddtechaccessories-backend.vercel.app/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      setMessages(data);

      //  Count unread safely
      const unread = data.filter((msg) => !msg.is_read).length;
      setUnreadCount(unread);

    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  //  MARK AS READ (FIXED)
  const markAsRead = async (id) => {
    try {
      await fetch(`https://eddtechaccessories-backend.vercel.app/api/admin/messages/${id}/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      //  INSTANT UI UPDATE (no waiting)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, is_read: true } : msg
        )
      );

      //  Update unread count instantly
      setUnreadCount((prev) => Math.max(prev - 1, 0));

     

    } catch (err) {
      console.error("MARK READ ERROR:", err);
    }
  };

  //  FILTER LOGIC
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name?.toLowerCase().includes(search.toLowerCase()) ||
      msg.email?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "read" && msg.is_read) ||
      (filter === "unread" && !msg.is_read);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-messages">

      {/* HEADER */}
      <div className="messages-topbar">
        <h2></h2>

        <div className="messages-badge">
          Messages
          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="messages-controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "unread" ? "active" : ""}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>

          <button
            className={filter === "read" ? "active" : ""}
            onClick={() => setFilter("read")}
          >
            Read
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="messages-table">

        <div className="messages-header">
          <span>Name</span>
          <span>Contact</span>
          <span>Subject</span>
          <span>Date</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`message-row ${msg.is_read ? "" : "unread"}`}
          >
            <div><strong>{msg.name}</strong></div>

            <div className="contact-info">
              <span>{msg.email}</span>
              <span>{msg.phone || "N/A"}</span>
            </div>

            <div>{msg.subject || "General Inquiry"}</div>

            <div className="date">{msg.created_at}</div>

            <div>
              <span className={`status ${msg.is_read ? "read" : "unread"}`}>
                {msg.is_read ? "Read" : "New"}
              </span>
            </div>

            <div className="actions">
              {!msg.is_read && (
                <button onClick={() => markAsRead(msg.id)}>
                  Mark Read
                </button>
              )}

              <a href={`mailto:${msg.email}`} className="reply-btn">
                Reply
              </a>
            </div>

            <div className="message-body">
              {msg.message}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
