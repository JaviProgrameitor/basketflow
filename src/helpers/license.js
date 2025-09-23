
import { getLicense } from '../api/license';
import { validateToken } from '../helpers/auth'
import { validateDeviceToken } from '../helpers/device';

async function validateLicense(visitor_id) {
  const userToken = localStorage.getItem('authToken');
  const deviceToken = localStorage.getItem('deviceToken');
  if (!userToken || !deviceToken) return false;

  try {
    const license = await getLicense(userToken, deviceToken, visitor_id);
    return true;
  } catch (error) {
    // console.error('Error validando licencia:', error);
    return false;
  }
}

// Ejemplo de función para validar acceso a la app usando la sesión y el dispositivo
async function hasAccessToApp (visitor_id) {
  const userActive = await validateToken();
  if (!userActive) {
    return { ok: false, error: "no-session" };
  }

  const deviceValid = await validateDeviceToken(visitor_id);
  if (!deviceValid) {
    return { ok: false, error: "no-device" };
  }

  const validLicense = await validateLicense(visitor_id);
  if (!validLicense) {
    return { ok: false, error: "no-license" };
  }
  return { ok: true };
}

export {
  hasAccessToApp
};