import api from './axiosConfig'
import axios from 'axios';

const axiosFile = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para adjuntar tokens automáticamente en cada request
axiosFile.interceptors.request.use(
  (config) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const deviceToken = localStorage.getItem('deviceToken');
      if (authToken && !config.headers['x-auth-token']) {
        config.headers['x-auth-token'] = authToken;
      }
      if (deviceToken && !config.headers['x-device-token']) {
        config.headers['x-device-token'] = deviceToken;
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Obtiene datos base del reporte (equivalente a getStatsMatchForReportByMatchId)
async function getStatsMatchForReportByMatchId(matchId) {
  const res = await api.get(`/reports/match/${matchId}/data`)
  return res.data
}

// Helper para descargar PDF, evitando el interceptor
async function generateOfficialGameReport(matchId, matchData) {
  // Usar la instancia base SIN interceptor de response
  // O bien, accede a .data pero con { responseType: 'blob' }
  const res = await axiosFile.post(
    `/reports/match/${matchId}/pdf`,
    { matchData },
    { responseType: 'blob' }
  );
  // Aquí res ES el blob, porque el interceptor global lo retorna .data
  return res;
}

export {
  getStatsMatchForReportByMatchId,
  generateOfficialGameReport,
}