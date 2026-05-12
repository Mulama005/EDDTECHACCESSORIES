import { useState } from "react";

const INITIAL_STATE = {
  subject: "",
  preheader: "",
  product_name: "",
  product_description: "",
  product_price: "",
  product_image: "",
  product_link: "",
  cta_text: "Shop Now",
  audience: "all",
};

export const useBroadcast = () => {
  const [broadcast, setBroadcast] = useState(INITIAL_STATE);
  const [loading, setLoading]     = useState(false);
  const [message, setMessage]     = useState("");
  const [isError, setIsError]     = useState(false);

  const resetForm = () => setBroadcast(INITIAL_STATE);

  const sendBroadcast = async () => {
    setLoading(true);
    setMessage("");
    setIsError(false);

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in as admin.");
      setIsError(true);
      setLoading(false);
      return;
    }

    if (!broadcast.subject || !broadcast.product_name || !broadcast.product_description) {
      setMessage("Subject, product name and description are required.");
      setIsError(true);
      setLoading(false);
      return;
    }

    try {
      const res  = await fetch("http://localhost:5000/api/admin/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(broadcast),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send campaign.");
      }

      setMessage(data.message);
      setIsError(false);
      resetForm();

    } catch (err) {
      setMessage(err.message || "Something went wrong. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    broadcast,
    setBroadcast,
    sendBroadcast,
    resetForm,
    loading,
    message,
    isError,
  };
};