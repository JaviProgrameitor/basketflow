import { updateUsername } from '../api/user.js';

async function updateUsernameHelper(newUsername) {
  if (!newUsername || newUsername.trim() === '') throw new Error('New username cannot be empty.');

  try {
    const result = await updateUsername({ newUsername });
    localStorage.setItem('user', JSON.stringify(result.user));
    return result.user;
  } catch (error) {
    throw new Error(`Failed to update username: ${error.response.data.msg}`);
  }
}

async function logoutHelper() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');

  return true;
}

export {
  updateUsernameHelper,
  logoutHelper
};
