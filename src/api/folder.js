import api from './axiosConfig'

// getFolders()
async function getFolders() {
  const res = await api.get('/folders')
  return res.data
}

// getFolderById(folderId)
async function getFolderById(folderId) {
  const res = await api.get(`/folders/${folderId}`)
  return res.data
}

// addFolder(folderData)
async function addFolder(folderData) {
  const res = await api.post('/folders', folderData)
  return res.data
}

// updateFolder(folderData)
async function updateFolder(folderData) {
  const res = await api.put('/folders', folderData)
  return res
}

// deleteFolder(folderId)
async function deleteFolder(folderId) {
  const res = await api.delete(`/folders/${folderId}`)
  return res.ok ?? true
}

// softDeleteFolder(folderId)
async function softDeleteFolder(folderId) {
  const res = await api.patch(`/folders/${folderId}/soft-delete`)
  return res
}

// activatePlayoffs(folderId)
async function activatePlayoffs(folderId) {
  const res = await api.post(`/folders/${folderId}/activate-playoffs`)
  return res
}

export {
  getFolders,
  getFolderById,
  addFolder,
  updateFolder,
  deleteFolder,
  softDeleteFolder,
  activatePlayoffs
};
