// Orquestador de la validación inicial y refrescos.
import { validateUserToken } from '../api/auth.js';
import { deviceGetOrCreate, deviceValidateToken } from '../api/device.js';
import { getLicense } from '../api/license.js';

// TTL de validación en ms (e.g., 30 minutos)
export const ACCESS_TTL_MS = 30 * 60 * 1000;

const getStoredAuthToken = () => localStorage.getItem('authToken');
const getStoredDeviceToken = () => localStorage.getItem('deviceToken');

const saveAuthToken = (token) => {
  if (token) localStorage.setItem('authToken', token);
};
const saveUserData = (user) => {
  if (user) localStorage.setItem('user', JSON.stringify(user));
}
const saveDeviceToken = (token) => {
  if (token) localStorage.setItem('deviceToken', token);
};
const clearTokens = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user')
  localStorage.removeItem('deviceToken');
};

// Retorna { ok, user, tokens: { authToken, deviceToken }, license?, error? }
export async function hasAccessToApp({ visitorId }) {
  try {
    // 1) Validar usuario
    let authToken = getStoredAuthToken();
    console.log('Validando usuario con token:', authToken);
    if (!authToken) {
      clearTokens();
      console.log('Validación de usuario fallida: no-session');
      return { ok: false, error: 'no-session' };
    }

    const userValidation = await validateUserToken(authToken);
    const user = userValidation.user;
    authToken = userValidation.token || authToken;
    saveAuthToken(authToken);
    saveUserData(user);

    // 2) Validar/crear dispositivo
    let deviceToken = getStoredDeviceToken();

    if (deviceToken) {
      try {
        const refreshedDeviceToken = await deviceValidateToken(visitorId, deviceToken);
        if (refreshedDeviceToken) {
          deviceToken = refreshedDeviceToken;
          saveDeviceToken(deviceToken);
        }
      } catch (e) {
        // Token de dispositivo inválido/expirado → lo regeneramos
        deviceToken = null;
        localStorage.removeItem('deviceToken');
      }
    }

    if (!deviceToken) {
      // Si tu backend requiere más datos, añádelos aquí (user_id, device fingerprint, etc.)
      const createdDeviceToken = await deviceGetOrCreate({ visitor_id: visitorId });
      deviceToken = createdDeviceToken;
      saveDeviceToken(deviceToken);
    }

    // 3) Validar licencia
    try {
      const license = await getLicense(visitorId);
    } catch (error) {
      // console.error("Error fetching license:", error);
      return { ok: false, error: 'no-license' };
    }

    return {
      ok: true,
      user,
      tokens: { authToken, deviceToken }
    };
  } catch (e) {
    // Mapeo simple de errores a códigos
    const msg = e?.response?.data?.msg?.toLowerCase?.() || '';
    if (msg.includes('validar token') || msg.includes('sesión') || msg.includes('unauthorized')) {
      clearTokens();
      return { ok: false, error: 'no-session' };
    }
    if (msg.includes('device')) {
      return { ok: false, error: 'no-device' };
    }
    if (msg.includes('license') || msg.includes('licencia')) {
      return { ok: false, error: 'no-license' };
    }
    clearTokens();
    return { ok: false, error: 'no-session' };
  }
}

export const tokenStorage = {
  getAuthToken: getStoredAuthToken,
  getDeviceToken: getStoredDeviceToken,
  saveAuthToken,
  saveDeviceToken,
  clearTokens,
};