import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Broadcast from "../../components/Broadcast";
import "./AdminOrders.css";

/* ───────────────── STATUS CONFIG ───────────────── */
const STATUS_CONFIG = {
  Pending:   { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  Confirmed: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)" },
  Shipped:   { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.3)" },
  Delivered: { color: "#25d366", bg: "rgba(37,211,102,0.1)", border: "rgba(37,211,102,0.3)" },
};

/* ───────────────── COMPONENT ───────────────── */
export default function AdminOrders() {
  const navigate = useNavigate();

  /* ───── STATE ───── */
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [updating, setUpdating] = useState(null);

  const [search, setSearch] = useState("");

const [filters, setFilters] = useState({
  customer: "",
  product: "",
  status: "",
});

const handleFilterChange = (field, value) => {
  setFilters(prev => ({ ...prev, [field]: value }));
};

const filteredOrders = orders.filter(order => {
  const matchesSearch =
    order.customer?.toLowerCase().includes(search.toLowerCase()) ||
    order.product_name?.toLowerCase().includes(search.toLowerCase()) ||
    String(order.id).includes(search);

  const matchesCustomer = filters.customer
    ? order.customer?.toLowerCase().includes(filters.customer.toLowerCase())
    : true;

  const matchesProduct = filters.product
    ? order.product_name?.toLowerCase().includes(filters.product.toLowerCase())
    : true;

  const matchesStatus = filters.status
    ? order.status === filters.status
    : true;

  return matchesSearch && matchesCustomer && matchesProduct && matchesStatus;
});

  /* ───────────────── FETCH ORDERS ───────────────── */
  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (res.status === 403) {
        return setError("Access denied. Admins only.");
      }

      if (!res.ok) throw new Error(data.error || "Failed to fetch orders");

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ───────────────── UPDATE STATUS ───────────────── */
  const updateStatus = async (id, newStatus) => {
    setUpdating(id);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (!res.ok) throw new Error(data.error || "Update failed");

      setOrders(prev =>
        prev.map(o => (o.id === id ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  };

  /* ───────────────── LOGOUT ───────────────── */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  /* ───────────────── EFFECT ───────────────── */
  useEffect(() => {
    fetchOrders();
  }, []);

  /* ───────────────── DERIVED DATA ───────────────── */
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    confirmed: orders.filter(o => o.status === "Confirmed").length,
    delivered: orders.filter(o => o.status === "Delivered").length,
  };

  /* ───────────────── UI STATES ───────────────── */

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">

      {/* ───── Sidebar ───── */}
      <aside className="admin-sidebar">
        <h2>EDD TECH</h2>

        <button className="admin-nav-item active">📦 Orders</button>

        <button className="admin-nav-item" onClick={() => navigate("/admin/campaigns")}>
        📢 Campaigns
        </button>

        <button className="admin-nav-item" onClick={() => navigate("/")}>
          🏠 View Store
        </button>

        <button className="admin-logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      

      {/* ───── Main Content ───── */}
      <main className="admin-main">
       

        {/* Header */}
        <div className="admin-topbar">
          <div>
            <h1 className="admin-topbar__title">Orders</h1>
            <p className="admin-topbar__subtitle">
            Manage and update customer orders
            </p>
          </div>

          <button className="admin-refresh-btn" onClick={fetchOrders}>
            🔄 Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Pending</span>
            <strong>{stats.pending}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Confirmed</span>
            <strong>{stats.confirmed}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Delivered</span>
            <strong>{stats.delivered}</strong>
          </div>
        </div>

        {/* Error */}
        {error && <div className="admin-error">{error}</div>}

        <div className="admin-filters">
          {/* SEARCH */}
          <input
          type="text"
          placeholder="🔍 Search by ID, customer, product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          />
          {/* CUSTOMER FILTER */}
          <input
          type="text"
          placeholder="Filter by customer"
          value={filters.customer}
          onChange={e => handleFilterChange("customer", e.target.value)}
          />
          {/* PRODUCT FILTER */}
          <input
          type="text"
          placeholder="Filter by product"
          value={filters.product}
          onChange={e => handleFilterChange("product", e.target.value)}
          />
          {/* STATUS FILTER */}
          <select
          value={filters.status}
          onChange={e => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            </select>
        </div>

        {/* Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => {
                  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;

                  return (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product_name}</td>

                      <td>
                        <span
                          className="status-badge"
                          style={{
                            color: cfg.color,
                            background: cfg.bg,
                            border: `1px solid ${cfg.border}`,
                          }}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td>
                        <select
                          value={order.status}
                          disabled={updating === order.id}
                          onChange={e =>
                            updateStatus(order.id, e.target.value)
                          }
                        >
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="admin-empty">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}