import api from './axiosConfig'

// getMatchById(matchId)
async function getMatchById(matchId) {
  const res = await api.get(`/match/${matchId}`)
  return res.data
}

// getMatchesByFolderId(folderId)
async function getMatchesByFolderId(folderId) {
  const res = await api.get(`/match/folder/${folderId}`)
  return res.data
}

// addMatch(matchData)
async function addMatch(matchData) {
  const res = await api.post('/match', matchData)
  return res.data
}

// updateMatch(matchData)
async function updateMatch(matchData) {
  const res = await api.put('/match', matchData)
  return res.data
}

// nextPeriod(matchId)
async function nextPeriod(matchId) {
  const res = await api.post(`/match/${matchId}/next-period`)
  return res.data
}

// activateLastFourMinutes(matchId)
async function activateLastFourMinutes(matchId) {
  const res = await api.post(`/match/${matchId}/activate-last-four-minutes`)
  return res.data
}

// deleteMatch(matchId)
async function deleteMatch(matchId) {
  const res = await api.delete(`/match/${matchId}`)
  return res.ok ?? true
}

// softDeleteMatch(matchId)
async function softDeleteMatch(matchId) {
  const res = await api.patch(`/match/${matchId}/soft-delete`)
  return res.data
}

async function verifyCrewChiefPassword(matchId, plainPassword) {
  const res = await api.post(`/match/${matchId}/verify-crew-chief-password`, { plainPassword })
  console.log('Respuesta de verifyCrewChiefPassword:', res);
  return res.ok
}

export {
  getMatchById,
  getMatchesByFolderId,
  addMatch,
  updateMatch,
  nextPeriod,
  activateLastFourMinutes,
  deleteMatch,
  softDeleteMatch,
  verifyCrewChiefPassword
}