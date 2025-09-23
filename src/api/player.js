import api from './axiosConfig'

// getPlayersByTeamIdAndFolderId(teamId, folderId)
export async function getPlayersByTeamIdAndFolderId(teamId, folderId) {
  const res = await api.get('/players', { params: { teamId, folderId } })
  return res.data
}

// addPlayer(team_id, folder_id, playerData)
export async function addPlayer(team_id, folder_id, playerData) {
  const res = await api.post('/players', { team_id, folder_id, playerData })
  return res.data
}

// updatePlayer(playerData)
export async function updatePlayer(playerData) {
  const res = await api.put('/players', playerData)
  return res.data
}

// deletePlayer(playerId)
export async function deletePlayer(playerId) {
  const res = await api.delete(`/players/${playerId}`)
  return res.ok ?? true
}

// softDeletePlayer(playerId)
export async function softDeletePlayer(playerId) {
  const res = await api.patch(`/players/${playerId}/soft-delete`)
  return res.data
}