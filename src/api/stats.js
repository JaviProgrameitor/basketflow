import api from './axiosConfig'

// getStatsByMatch(match_id)
async function getStatsByMatch(matchId) {
  const res = await api.get(`/stats/match/${matchId}`)
  return res.data
}

// getStatsByFolder(folder_id)
async function getStatsByFolder(folderId) {
  const res = await api.get(`/stats/folder/${folderId}`)
  return res.data
}

// getPointsPerGameByFolder(folderId)
async function getPointsPerGameByFolder(folderId) {
  const res = await api.get(`/stats/folder/${folderId}/points-per-game`)
  return res.data
}

// getThreePointersMadeByFolder(folderId)
async function getThreePointersMadeByFolder(folderId) {
  const res = await api.get(`/stats/folder/${folderId}/three-pointers-made`)
  return res.data
}

// getTopScorersTeamsByFolder(folderId)
async function getTopScorersTeamsByFolder(folderId) {
  const res = await api.get(`/stats/folder/${folderId}/top-scorers-teams`)
  return res.data
}

// getFewerPointsAllowedTeamsByFolder(folderId)
async function getFewerPointsAllowedTeamsByFolder(folderId) {
  const res = await api.get(`/stats/folder/${folderId}/fewer-points-allowed-teams`)
  return res.data
}

// getFewerFoulsMadeTeamsByFolder(folderId)
async function getFewerFoulsMadeTeamsByFolder(folderId) {
  const res = await api.get(`/stats/folder/${folderId}/fewer-fouls-made-teams`)
  return res.data
}

// getTopFoulsMadePlayerByFolder(folderId)
async function getTopFoulsMadePlayerByFolder(folderId) {
  const res = await api.get(`/stats/folder/${folderId}/top-fouls-made-players`)
  return res.data
}

// getFewerFoulsMadePlayerByFolder(folderId)
async function getFewerFoulsMadePlayerByFolder(folderId) {
  const res = await api.get(`/stats/folder/${folderId}/fewer-fouls-made-players`)
  return res.data
}

export {
  getStatsByMatch,
  getStatsByFolder,
  getPointsPerGameByFolder,
  getThreePointersMadeByFolder,
  getTopScorersTeamsByFolder,
  getFewerPointsAllowedTeamsByFolder,
  getFewerFoulsMadeTeamsByFolder,
  getTopFoulsMadePlayerByFolder,
  getFewerFoulsMadePlayerByFolder,
}