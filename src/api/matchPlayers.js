import api from './axiosConfig'

// getMatchPlayers(matchId)
async function getMatchPlayers(matchId) {
  const res = await api.get(`/match-players/${matchId}`)
  return res.data
}

// addMatchPlayer(matchId, playerId, jerseyNumber)
async function addMatchPlayer(matchId, playerId, jerseyNumber) {
  const res = await api.post('/match-players', { matchId, playerId, jerseyNumber })
  return res.data
}

// removeMatchPlayer(matchId, playerId)
async function removeMatchPlayer(matchId, playerId) {
  const res = await api.delete('/match-players', { data: { matchId, playerId } })
  return res.ok ?? true
}

// softDeleteMatchPlayer(matchId, playerId)
async function softDeleteMatchPlayer(matchId, playerId) {
  const res = await api.patch('/match-players/soft-delete', { matchId, playerId })
  return res.data
}

// changeParticipationPlayer(matchId, playerId, newStatus)
async function changeParticipationPlayer(matchId, playerId, newStatus) {
  const res = await api.patch('/match-players/participation', { matchId, playerId, newStatus })
  return res.data
}

export {
  getMatchPlayers,
  addMatchPlayer,
  removeMatchPlayer,
  softDeleteMatchPlayer,
  changeParticipationPlayer
}