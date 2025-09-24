import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useAccess } from "../context/AccessProvider.jsx";
import BasketFlowLoader from "../pages/BasketFlowLoader.jsx";

export default function ProtectedRoute({ children }) {
  const { status, ensureFreshAccess } = useAccess();
  const location = useLocation();

  // Refresca en background si el TTL venció (no bloquea UX si ya estaba ok)
  useEffect(() => {
    ensureFreshAccess();
  }, [ensureFreshAccess]);

  if (status.loading) return <BasketFlowLoader />;

  if (!status.ok) {
    if (status.error === "no-session") {
      return <Navigate to="/login" replace />;
    }
    if (status.error === "no-license" && location.pathname !== "/pay-license") {
      return <Navigate to="/pay-license" replace />;
    }
    if (status.error === "no-device") {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}