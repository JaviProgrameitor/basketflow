import api from './axiosConfig'

async function addTeam(teamName) {
  const res = await api.post('/teams', { name: teamName })
  return res.data
}

export {
  addTeam,
}