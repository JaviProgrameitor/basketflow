import api from './axiosConfig.js';

const registerUser = async (dataUser = {}) => {
  try {
    const response = await api.post('/users', dataUser);

    return { user: response.user, token: response.token };
  } catch (error) {
    console.log(error.response.data);
    throw new Error(error.response?.data.msg || 'Error al registrar usuario');
  }
};

const updateUsername = async ({ newUsername }) => {
  try {
    const resp = await api.patch(`/users/username`, {
      username: newUsername
    }, { timeout: 30000 });

    return { user: resp.user };
  } catch (err) {
    const msg = err?.response?.data?.msg || err?.message || 'No se pudo actualizar el nombre de usuario.';
    throw new Error(msg);
  }
};

export {
  registerUser,
  updateUsername
}