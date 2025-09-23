import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAccess } from "../context/AccessProvider.jsx";
import BasketFlowLoader from "../pages/BasketFlowLoader.jsx";

export default function ProtectedRoute({ children }) {
  const { status, ensureFreshAccess } = useAccess();

  // Refresca en background si el TTL venció (no bloquea UX si ya estaba ok)
  useEffect(() => {
    ensureFreshAccess();
  }, [ensureFreshAccess]);

  if (status.loading) return <BasketFlowLoader />; // Puedes poner un spinner aquí

  if (!status.ok) {
    if (status.error === "no-session") {
      return <Navigate to="/login" replace />;
    }
    if (status.error === "no-license") {
      return <Navigate to="/pay-license" replace />;
    }
    if (status.error === "no-device") {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}