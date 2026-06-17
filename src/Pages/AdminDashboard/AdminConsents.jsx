import { useEffect, useState } from "react";
import "./AdminConsents.css";

const API_BASE_URL = "https://eddtechaccessories-backend.vercel.app";

const CONSENT_TYPE_STYLES = {
  all: { background: "rgba(22,163,74,0.08)", color: "#16a34a", border: "1px solid rgba(22,163,74,0.25)" },
  necessary: { background: "rgba(59,130,246,0.08)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)" },
  custom: { background: "rgba(245,158,11,0.08)", color: "#d97706", border: "1px solid rgba(245,158,11,0.25)" },
};

function ConsentTypeBadge({ type }) {
  const style = CONSENT_TYPE_STYLES[type?.toLowerCase()] ?? {
    background: "#f3f4f6",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
  };
  return (
    <span className="consent-type-badge" style={style}>
      {type ?? "—"}
    </span>
  );
}

function BoolCell({ value }) {
  return value ? (
    <span className="consent-bool consent-bool--yes">✓</span>
  ) : (
    <span className="consent-bool consent-bool--no">—</span>
  );
}

function StatusBadge({ isActive }) {
  return isActive ? (
    <span className="consent-status consent-status--active">Active</span>
  ) : (
    <span className="consent-status consent-status--withdrawn">Withdrawn</span>
  );
}

export default function AdminConsents() {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/consents/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Stats request failed (${res.status})`);
      setStats(await res.json());
    } catch (err) {
      console.error("Stats Error:", err);
      setError(err.message);
    }
  };

  const fetchRecords = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `${API_BASE_URL}/api/admin/consents?page=${currentPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error(`Records request failed (${res.status})`);
      const data = await res.json();
      setRecords(data.records || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error("Records Error:", err);
      setError(err.message);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecords(page);
  }, [page]);

  const handleRefresh = () => {
    fetchStats();
    fetchRecords(page);
  };

  return (
    <div className="admin-consents">
      {/* ── Header ── */}
      <div className="admin-consents-header">
        <div>
          <h1>Cookie Consents</h1>
          <p>Audit trail of all user cookie consent decisions</p>
        </div>
        <button onClick={handleRefresh} className="refresh-btn">
          Refresh
        </button>
      </div>

      {/* ── Card ── */}
      <div className="consents-card">
        <div className="card-header">
          <h2>Consent Records</h2>
          <div className="total-pill">{stats?.total ?? records.length} total</div>
        </div>

        {error && (
          <div className="error-box">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* ── Stats grid ── */}
        {stats && (
          <div className="stats-grid">
            {[
              { label: "Total", value: stats.total },
              { label: "Active", value: stats.active },
              { label: "Accept All", value: stats.all },
              { label: "Necessary Only", value: stats.necessary },
              { label: "Custom", value: stats.custom },
              { label: "Withdrawn", value: stats.withdrawn },
            ].map(({ label, value }) => (
              <div className="stat-item" key={label}>
                <strong>{label}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Body ── */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading consent records…</p>
          </div>
        ) : records.length === 0 ? (
          <div className="empty-state">
            <p>No consent records found.</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="consents-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Session ID</th>
                    <th>Type</th>
                    <th>Necessary</th>
                    <th>Analytics</th>
                    <th>Functional</th>
                    <th>Marketing</th>
                    <th>Status</th>
                    <th>Consent Date</th>
                    <th>Withdrawn</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td className="col-id">{record.id}</td>

                      <td>
                        {record.session_id ? (
                          <span className="consent-session-id">
                            {record.session_id.substring(0, 12)}…
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td>
                        <ConsentTypeBadge type={record.consent_type} />
                      </td>

                      <td><BoolCell value={record.necessary} /></td>
                      <td><BoolCell value={record.analytics} /></td>
                      <td><BoolCell value={record.functional} /></td>
                      <td><BoolCell value={record.marketing} /></td>

                      <td>
                        <StatusBadge isActive={record.is_active} />
                      </td>

                      <td className="col-date">{record.consented_at || "—"}</td>
                      <td className="col-date">{record.withdrawn_at || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Pagination ── */}
            <div className="consent-pagination">
              <button
                className="consent-page-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Previous
              </button>

              <span className="consent-page-info">
                Page {page} of {totalPages}
              </span>

              <button
                className="consent-page-btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}