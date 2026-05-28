import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminOrders.css";

/* ───────────────── STATUS CONFIG ───────────────── */
const STATUS_CONFIG = {
  Pending: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.3)",
  },
  Confirmed: {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.3)",
  },
  Shipped: {
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.3)",
  },
  Delivered: {
    color: "#25d366",
    bg: "rgba(37,211,102,0.1)",
    border: "rgba(37,211,102,0.3)",
  },
};

/* ───────────────── COMPONENT ───────────────── */
export default function AdminOrders() {
  const navigate = useNavigate();

  /* ───── STATE ───── */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  /* MOBILE SIDEBAR */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* SEARCH + FILTERS */
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    customer: "",
    product: "",
    status: "",
  });

  /* ───────────────── BODY SCROLL LOCK ───────────────── */
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("admin-menu-open");
    } else {
      document.body.classList.remove("admin-menu-open");
    }

    return () => {
      document.body.classList.remove("admin-menu-open");
    };
  }, [sidebarOpen]);

  /* ───────────────── FILTERS ───────────────── */
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order.product_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      String(order.id).includes(search);

    const matchesCustomer = filters.customer
      ? order.customer
          ?.toLowerCase()
          .includes(filters.customer.toLowerCase())
      : true;

    const matchesProduct = filters.product
      ? order.product_name
          ?.toLowerCase()
          .includes(filters.product.toLowerCase())
      : true;

    const matchesStatus = filters.status
      ? order.status === filters.status
      : true;

    return (
      matchesSearch &&
      matchesCustomer &&
      matchesProduct &&
      matchesStatus
    );
  });

  /* ───────────────── FETCH ORDERS ───────────────── */
  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return navigate("/login");
      }

      const res = await fetch(
        "https://eddtechaccessories-backend.vercel.app/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (res.status === 403) {
        return setError("Access denied. Admins only.");
      }

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to fetch orders"
        );
      }

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

      const res = await fetch(
        `https://eddtechaccessories-backend.vercel.app/api/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (!res.ok) {
        throw new Error(
          data.error || "Update failed"
        );
      }

      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, status: newStatus }
            : o
        )
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
    pending: orders.filter(
      (o) => o.status === "Pending"
    ).length,
    confirmed: orders.filter(
      (o) => o.status === "Confirmed"
    ).length,
    delivered: orders.filter(
      (o) => o.status === "Delivered"
    ).length,
  };

  /* ───────────────── LOADING ───────────────── */
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

      {/* ───────────────── OVERLAY ───────────────── */}
      <div
        className={`admin-sidebar-overlay ${
          sidebarOpen
            ? "admin-sidebar-overlay--show"
            : ""
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ───────────────── SIDEBAR ───────────────── */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen
            ? "admin-sidebar--open"
            : ""
        }`}
      >
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">
            EDD TECH
          </span>

          <span className="admin-sidebar__sub">
            Admin Panel
          </span>
        </div>

        <nav className="admin-sidebar__nav">

          <button className="admin-nav-item admin-nav-item--active">
            📦 Orders
          </button>

          <button
            className="admin-nav-item"
            onClick={() => {
              navigate("/admin/campaigns");
              setSidebarOpen(false);
            }}
          >
            📢 Campaigns
          </button>

          <button
            className="admin-nav-item"
            onClick={() => {
              navigate("/");
              setSidebarOpen(false);
            }}
          >
            🏠 View Store
          </button>
        </nav>

        <div className="admin-sidebar__footer">
          <button
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ───────────────── MAIN CONTENT ───────────────── */}
      <main className="admin-main">

        {/* ───────────────── TOPBAR ───────────────── */}
        <div className="admin-topbar">

          {/* LEFT */}
          <div className="admin-topbar__left">

            {/* MOBILE HAMBURGER */}
            <button
              className="admin-mobile-toggle"
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
            >
              ☰
            </button>

            <div>
              <h1 className="admin-topbar__title">
                Orders
              </h1>

              <p className="admin-topbar__subtitle">
                Manage and update customer orders
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <button
            className="admin-refresh-btn"
            onClick={fetchOrders}
          >
            🔄 Refresh
          </button>
        </div>

        {/* ───────────────── STATS ───────────────── */}
        <div className="admin-stats">

          <div className="admin-stat-card">
            <span className="admin-stat-card__label">
              Total
            </span>

            <strong className="admin-stat-card__value">
              {stats.total}
            </strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-card__label">
              Pending
            </span>

            <strong className="admin-stat-card__value">
              {stats.pending}
            </strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-card__label">
              Confirmed
            </span>

            <strong className="admin-stat-card__value">
              {stats.confirmed}
            </strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-card__label">
              Delivered
            </span>

            <strong className="admin-stat-card__value">
              {stats.delivered}
            </strong>
          </div>
        </div>

        {/* ───────────────── ERROR ───────────────── */}
        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        {/* ───────────────── FILTERS ───────────────── */}
        <div className="admin-filters">

          <input
            type="text"
            placeholder="🔍 Search by ID, customer, product..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Filter by customer"
            value={filters.customer}
            onChange={(e) =>
              handleFilterChange(
                "customer",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Filter by product"
            value={filters.product}
            onChange={(e) =>
              handleFilterChange(
                "product",
                e.target.value
              )
            }
          />

          <select
            value={filters.status}
            onChange={(e) =>
              handleFilterChange(
                "status",
                e.target.value
              )
            }
          >
            <option value="">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>
          </select>
        </div>

        {/* ───────────────── TABLE ───────────────── */}
        <div className="admin-table-card">

          <div className="admin-table-card__header">
            <h3 className="admin-table-card__title">
              Orders
            </h3>

            <span className="admin-table-card__count">
              {filteredOrders.length} orders
            </span>
          </div>

          <div className="admin-table-wrap">

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
                  filteredOrders.map((order) => {
                    const cfg =
                      STATUS_CONFIG[order.status] ||
                      STATUS_CONFIG.Pending;

                    return (
                      <tr key={order.id}>

                        <td>
                          <span className="admin-cell-id">
                            #{order.id}
                          </span>
                        </td>

                        <td>
                          <span className="admin-cell-customer">
                            {order.customer}
                          </span>
                        </td>

                        <td>
                          <span className="admin-cell-product">
                            {order.product_name}
                          </span>
                        </td>

                        <td>
                          <span
                            className="admin-status-badge"
                            style={{
                              color: cfg.color,
                              background: cfg.bg,
                              border: `1px solid ${cfg.border}`,
                            }}
                          >
                            <span
                              className="admin-status-badge__dot"
                              style={{
                                background: cfg.color,
                              }}
                            />

                            {order.status}
                          </span>
                        </td>

                        <td>
                          <select
                            className="admin-status-select"
                            value={order.status}
                            disabled={
                              updating === order.id
                            }
                            onChange={(e) =>
                              updateStatus(
                                order.id,
                                e.target.value
                              )
                            }
                          >
                            <option>
                              Pending
                            </option>

                            <option>
                              Confirmed
                            </option>

                            <option>
                              Shipped
                            </option>

                            <option>
                              Delivered
                            </option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="admin-empty"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>
        </div>

      </main>
    </div>
  );
}