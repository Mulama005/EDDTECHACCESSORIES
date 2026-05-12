import { useState, useEffect, useCallback } from "react";

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res  = await fetch("http://localhost:5000/api/admin/campaigns", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load campaigns.");
      setCampaigns(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCampaign = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/admin/campaigns/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setCampaigns(prev => prev.filter(c => c.id !== id));
    } catch {
      alert("Failed to delete campaign.");
    }
  };

  useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);

  return { campaigns, loading, error, fetchCampaigns, deleteCampaign };
}