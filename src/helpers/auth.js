import { login, validateUserToken } from '../api/auth';
import { registerUser as register } from '../api/user';
import { getDeviceInfo } from './device';

async function authenticateUser(email, password, fingerprintData) {
  try {
    const deviceId = await getDeviceInfo(fingerprintData.visitorId, fingerprintData.requestId);
    const { user, token } = await login(email, password);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

async function registerUser(email, password, username, fingerprintData) {
  try {
    const deviceId = await getDeviceInfo(fingerprintData.visitorId, fingerprintData.requestId);
    const { user, token } = await register({email, password, username, deviceId});
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

async function validateToken() {
  const savedToken = localStorage.getItem('authToken');
  const userToken = localStorage.getItem('user');
  if (!savedToken || !userToken) return false;
  try {
    const { user, token } = await validateUserToken(savedToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', token);
    return true;
  } catch (error) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    console.error('Error validando token:', error);
    return false;
  }
}

export {
  authenticateUser,
  registerUser,
  validateToken
};
