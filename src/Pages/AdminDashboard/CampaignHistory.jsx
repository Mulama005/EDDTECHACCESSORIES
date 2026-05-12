import { useCampaigns } from "../../components/hooks/useCampaigns";
import "./CampaignHistory.css";

export default function CampaignHistory() {
  const { campaigns, loading, error, fetchCampaigns, deleteCampaign } = useCampaigns();

  if (loading) return (
    <div className="ch-loading">
      <div className="ch-spinner" />
      <p>Loading campaign history...</p>
    </div>
  );

  if (error) return <div className="ch-error">{error}</div>;

  return (
    <div className="ch-card">
      <div className="ch-card__header">
        <div>
          <h3 className="ch-card__title">Campaign History</h3>
          <p className="ch-card__subtitle">
            {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""} sent
          </p>
        </div>
        <button className="ch-refresh-btn" onClick={fetchCampaigns}>
          🔄 Refresh
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="ch-empty">
          <div className="ch-empty__icon">📭</div>
          <p className="ch-empty__text">No campaigns sent yet.</p>
          <p className="ch-empty__sub">Your campaign history will appear here once you send one.</p>
        </div>
      ) : (
        <div className="ch-table-wrap">
          <table className="ch-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Subject</th>
                <th>Audience</th>
                <th>Date Sent</th>
                <th>Delivered</th>
                <th>Failed</th>
                <th>Total Reached</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, index) => (
                <tr key={c.id}>

                  <td className="ch-cell-id">#{index + 1}</td>

                  <td>
                    <div className="ch-product-cell">
                      <div className="ch-product-thumb">
                        {c.product_image
                          ? <img src={c.product_image} alt={c.product_name} />
                          : <span>📦</span>
                        }
                      </div>
                      <div>
                        <p className="ch-product-name">{c.product_name}</p>
                        {c.product_price && (
                          <p className="ch-product-price">{c.product_price}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="ch-cell-subject">{c.subject}</td>

                  <td>
                    <span className={`ch-audience ch-audience--${c.audience}`}>
                      {c.audience === "all" ? "All Subscribers" : c.audience.charAt(0).toUpperCase() + c.audience.slice(1)}
                    </span>
                  </td>

                  <td className="ch-cell-date">
                    <p className="ch-date-main">{c.sent_at.split(",")[0]}</p>
                    <p className="ch-date-time">{c.sent_at.split(",")[1]?.trim()}</p>
                  </td>

                  <td>
                    <span className="ch-stat-badge ch-stat-badge--sent">
                      ✓ {c.sent_count}
                    </span>
                  </td>

                  <td>
                    <span className="ch-stat-badge ch-stat-badge--failed">
                      ✗ {c.failed_count}
                    </span>
                  </td>

                  <td>
                    <span className="ch-total">
                      {c.sent_count + c.failed_count} subscribers
                    </span>
                  </td>

                  <td>
                    <button
                      className="ch-delete-btn"
                      onClick={() => {
                        if (window.confirm(`Delete campaign "${c.subject}"?`)) {
                          deleteCampaign(c.id);
                        }
                      }}
                    >
                      🗑
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}