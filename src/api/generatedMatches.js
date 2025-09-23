import api from './axiosConfig'

// getGeneratedMatchesByFolderId(folderId)
async function getGeneratedMatchesByFolderId(folderId) {
  const res = await api.get(`/generated-matches/folder/${folderId}`)
  return res.data
}

// addGeneratedMatches(matches)
async function addGeneratedMatches(matches) {
  // puedes enviar como { matches } (el backend acepta ambos formatos)
  const res = await api.post('/generated-matches', { matches })
  return res.data
}

// updateGeneratedMatch(matchData)
async function updateGeneratedMatch(matchData) {
  const res = await api.put('/generated-matches', matchData)
  return res.data
}

// deleteGeneratedMatch(matchId)
async function deleteGeneratedMatch(matchId) {
  const res = await api.delete(`/generated-matches/${matchId}`)
  return res.ok ?? true
}

// softDeleteGeneratedMatch(matchId)
async function softDeleteGeneratedMatch(matchId) {
  const res = await api.patch(`/generated-matches/${matchId}/soft-delete`)
  return res.data
}

// deleteAllGeneratedMatchesByFolderId(folderId)
async function deleteAllGeneratedMatchesByFolderId(folderId) {
  const res = await api.delete(`/generated-matches/folder/${folderId}`)
  return res.ok ?? true
}

// softDeleteAllGeneratedMatchesByFolderId(folderId)
async function softDeleteAllGeneratedMatchesByFolderId(folderId) {
  const res = await api.patch(`/generated-matches/folder/${folderId}/soft-delete`)
  return res.ok ?? true
}

// publishGeneratedMatch(matchId)
async function publishGeneratedMatch(matchId) {
  const res = await api.post(`/generated-matches/${matchId}/publish`)
  return res.data
}

export {
  getGeneratedMatchesByFolderId,
  addGeneratedMatches,
  updateGeneratedMatch,
  deleteGeneratedMatch,
  softDeleteGeneratedMatch,
  deleteAllGeneratedMatchesByFolderId,
  softDeleteAllGeneratedMatchesByFolderId,
  publishGeneratedMatch
}