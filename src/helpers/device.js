
import { deviceGetOrCreate, deviceValidateToken } from '../api/device';

async function getDeviceInfo(visitorId, requestId) {
  try {
    const device = await deviceGetOrCreate({ visitor_id: visitorId, request_id: requestId });
    localStorage.setItem('deviceToken', device);
    return device;
  } catch (error) {
    console.error('Error getting device info:', error);
    throw error;
  }
}

async function validateDeviceToken(visitor_id) {
  const savedDeviceToken = localStorage.getItem('deviceToken');
  if (!savedDeviceToken) return false;

  try {
    const deviceToken = await deviceValidateToken(visitor_id, savedDeviceToken);
    localStorage.setItem('deviceToken', deviceToken);
    return true;
  } catch (error) {
    localStorage.removeItem('deviceToken');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    console.error('Error validando token de dispositivo:', error);
    return false;
  }
}

export {
  getDeviceInfo,
  validateDeviceToken
}