import api from './axiosConfig'

// getTopSeeds(folderId, limit)
async function getTopSeeds(folderId, limit) {
  try {
    const res = await api.get(`/playoff-series/folder/${folderId}/top-seeds?limit=${limit}`)
    return res.data
  } catch (error) {
    throw error.response?.data?.msg || 'Error al obtener los mejores cabezas de serie'
  }
}

// getSeriesByFolder(folderId)
async function getSeriesByFolder(folderId) {
  try {
    const res = await api.get(`/playoff-series/folder/${folderId}`)
    return res.data
  } catch (error) {
    throw error.response?.data?.msg || 'Error al obtener las series'
  }
}

// ensureSemifinals(folderId)
async function ensureSemifinals(folderId) {
  try {
    const res = await api.post(`/playoff-series/folder/${folderId}/ensure-semifinals`)
    return res.data
  } catch (error) {
    throw error.response?.data?.msg || 'Error al generar las semifinales'
  }
}

// getMatchesBySeries(seriesId)
async function getMatchesBySeries(seriesId) {
  try {
    const res = await api.get(`/playoff-series/${seriesId}/matches`)
    return res.data
  } catch (error) {
    throw error.response?.data?.msg || 'Error al obtener los partidos'
  }
}

// createMatchForSeries(seriesId, options)
async function createMatchForSeries(seriesId, options) {
  try {
    const res = await api.post(`/playoff-series/${seriesId}/create-match`, options)
    return res.data
  } catch (error) {
    throw error.response?.data?.msg || 'Error al crear el partido'
  }
}

// updateSeriesFromMatches(seriesId)
async function updateSeriesFromMatches(seriesId) {
  try {
    const res = await api.post(`/playoff-series/${seriesId}/update-from-matches`)
    return res.data
  } catch (error) {
    throw error.response?.data?.msg || 'Error al actualizar la serie'
  }
}

// ensureFinal(folderId)
async function ensureFinal(folderId) {
  try {
    const res = await api.post(`/playoff-series/folder/${folderId}/ensure-final`)
    return res.data
  } catch (error) {
    throw error.response?.data?.msg || 'Error al generar la final'
  }
}

export {
  getTopSeeds,
  getSeriesByFolder,
  ensureSemifinals,
  getMatchesBySeries,
  createMatchForSeries,
  updateSeriesFromMatches,
  ensureFinal
}