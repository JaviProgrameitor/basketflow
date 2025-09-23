import api from './axiosConfig'

// getFoldersTeams()
async function getFoldersTeams() {
  const res = await api.get('/folders-teams')
  return res.data
}

// getFoldersTeamsByFolderId(folderId)
async function getFoldersTeamsByFolderId(folderId) {
  const res = await api.get(`/folders-teams/by-folder/${folderId}`)
  return res.data
}

// getFoldersTeamsByFolderIdAndTeamId(foldersTeamsData)
async function getFoldersTeamsByFolderIdAndTeamId({ folder_id, team_id }) {
  const res = await api.get(`/folders-teams/by-folder-and-team`, { params: { folder_id, team_id } })
  return res.data
}

// addFoldersTeams(foldersTeamsData)
async function addFoldersTeams(foldersTeamsData) {
  const res = await api.post('/folders-teams', foldersTeamsData)
  return res.data
}

// updateFoldersTeams(foldersTeamsData)
async function updateFoldersTeams(foldersTeamsData) {
  const res = await api.put('/folders-teams', foldersTeamsData)
  return res.data
}

// deleteFoldersTeams(foldersTeamsData)
async function deleteFoldersTeams(foldersTeamsData) {
  const res = await api.delete('/folders-teams', { data: foldersTeamsData })
  return res.ok ?? true
}

// softDeleteFoldersTeams(foldersTeamsData)
async function softDeleteFoldersTeams(foldersTeamsData) {
  const res = await api.patch('/folders-teams/soft-delete', foldersTeamsData)
  return res.data
}

export {
  getFoldersTeams,
  getFoldersTeamsByFolderId,
  getFoldersTeamsByFolderIdAndTeamId,
  addFoldersTeams,
  updateFoldersTeams,
  deleteFoldersTeams,
  softDeleteFoldersTeams
}