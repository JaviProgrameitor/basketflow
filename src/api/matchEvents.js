import api from './axiosConfig'

// getMatchEventsByMatchId(matchId)
async function getMatchEventsByMatchId(matchId) {
  const res = await api.get(`/match-events/match/${matchId}`)
  return res.data
}

// getDeletedMatchEventsByMatchId(matchId)
async function getDeletedMatchEventsByMatchId(matchId) {
  const res = await api.get(`/match-events/match/${matchId}/deleted`)
  return res.data
}

// addPointsEvent(pointsEvent)
async function addPointsEvent(pointsEvent) {
  const res = await api.post('/match-events/points', pointsEvent)
  return res.data
}

// addFoulEvent(foulEvent)
async function addFoulEvent(foulEvent) {
  const res = await api.post('/match-events/foul', foulEvent)
  return res.data
}

// addTimeoutEvent(timeoutEvent)
async function addTimeoutEvent(timeoutEvent) {
  const res = await api.post('/match-events/timeout', timeoutEvent)
  return res.data
}

// deleteMatchEvent(eventId)
async function deleteMatchEvent(eventId) {
  const res = await api.delete(`/match-events/${eventId}`)
  return res.ok ?? true
}

// softDeleteMatchEvent(eventData)
async function softDeleteMatchEvent(eventData) {
  const res = await api.patch('/match-events/soft-delete', eventData)
  return res.data
}

export {
  getMatchEventsByMatchId,
  getDeletedMatchEventsByMatchId,
  addPointsEvent,
  addFoulEvent,
  addTimeoutEvent,
  deleteMatchEvent,
  softDeleteMatchEvent
}