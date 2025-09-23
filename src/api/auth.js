import api from './axiosConfig.js';

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    return {user: response.user, token: response.token};
  } catch (error) {
    // console.log(error.response.data);
    throw new Error(error.response?.data.msg || 'Error al iniciar sesión');
  }
};

const validateUserToken = async (token) => {
  try {
    const response = await api.get('/auth/validate', {
      headers: {
        'x-auth-token': token
      }
    });

    return { user: response.user, token: response.token };
  } catch (error) {
    // console.log(error.response?.data);
    throw new Error(error.response?.data?.msg || 'Error al validar token');
  }
};

const requestPasswordReset = async (email) => {
  try {
    const resp = await api.post(`/auth/password/request-code`, { email }, { timeout: 30000 });
    return resp || { ok: true };
  } catch (err) {
    const msg = err?.response?.data?.message || err?.message || 'No se pudo solicitar el código';
    throw new Error(msg);
  }
}

const verifyPasswordResetCode = async ({ email, code }) => {
  try {
    const resp = await api.post(`/auth/password/verify-code`, { email, code }, { timeout: 30000 });
    return resp; // { reset_token }
  } catch (err) {
    const msg = err?.response?.data?.message || err?.message || 'Código inválido o expirado';
    throw new Error(msg);
  }
}

const resetPassword = async ({ reset_token, new_password }) => {
  try {
    const resp = await api.post(`/auth/password/reset`, { reset_token, new_password }, { timeout: 30000 });
    return resp; // { ok: true }
  } catch (err) {
    const msg = err?.response?.data?.message || err?.message || 'No se pudo restablecer la contraseña';
    throw new Error(msg);
  }
}

export {
  login,
  validateUserToken,
  requestPasswordReset,
  verifyPasswordResetCode,
  resetPassword
};
