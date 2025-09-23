import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { hasAccessToApp, ACCESS_TTL_MS, tokenStorage } from '../helpers/access.js';

const AccessContext = createContext(null);

export function AccessProvider({ children }) {
  const { getData } = useVisitorData();
  const [status, setStatus] = useState({ loading: true, ok: false, error: null, user: null });
  const lastValidatedAtRef = useRef(0);

  const refreshAccess = useCallback(async (force = false) => {
    try {
      if (!force) {
        // Si ya está validado y el TTL no ha vencido, no bloqueamos
        const now = Date.now();
        if (status.ok && now - lastValidatedAtRef.current < ACCESS_TTL_MS) {
          return;
        }
      }

      // Para una validación explícita, muestra loading si aún no estaba ok
      setStatus((prev) => prev.ok ? prev : { ...prev, loading: true });

      const { visitorId } = await getData({ ignoreCache: true });
      const result = await hasAccessToApp({ visitorId });

      lastValidatedAtRef.current = Date.now();

      if (result.ok) {
        setStatus({ loading: false, ok: true, error: null, user: result.user });
      } else {
        setStatus({ loading: false, ok: false, error: result.error || 'no-session', user: null });
      }
    } catch (e) {
      setStatus({ loading: false, ok: false, error: 'no-session', user: null });
    }
  }, [getData, status.ok]);

  // Inicial: validación al montar
  useEffect(() => {
    refreshAccess(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Forzar refresco si TTL venció (sin bloquear)
  const ensureFreshAccess = useCallback(() => {
    const now = Date.now();
    if (now - lastValidatedAtRef.current >= ACCESS_TTL_MS) {
      // Refrescar en background
      refreshAccess(false);
    }
  }, [refreshAccess]);

  const logout = useCallback(() => {
    tokenStorage.clearTokens();
    setStatus({ loading: false, ok: false, error: 'no-session', user: null });
  }, []);

  // Permite setear manualmente el authToken tras login y revalidar
  const setAuthTokenAndRevalidate = useCallback(async (token) => {
    tokenStorage.saveAuthToken(token);
    await refreshAccess(true);
  }, [refreshAccess]);

  const value = useMemo(() => ({
    status,
    refreshAccess,
    ensureFreshAccess,
    logout,
    setAuthTokenAndRevalidate,
  }), [status, refreshAccess, ensureFreshAccess, logout, setAuthTokenAndRevalidate]);

  return (
    <AccessContext.Provider value={value}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (!ctx) {
    throw new Error('useAccess debe usarse dentro de <AccessProvider>');
  }
  return ctx;
}