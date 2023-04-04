import service from './base/service'
import { API } from './base/config'

export const eventApi = {
    getAllEvents () {
        return service.get(`${API.event('')}?limit=100`)
    },
    getEventByID (eventId) {
        return service.get(`${API.event('')}${eventId}`)
    },
    createEvent (data) {
        return service.post(`${API.event('')}`, data)
    },
    updateEvent(eventId, data){
        return service.put(`${API.event('')}${eventId}`, data)
    },
    deleteEvent (eventId) {
        return service.delete(`${API.event('')}${eventId}`)
    },
    authenticateGoogleCalendar () {
        return service.get(`${API.google('')}authenticate`)
    },
    revokeGoogleCredentials () {
        return service.delete(`${API.google('')}revoke`)
    },
    syncCalendar () {
        return service.get(`${API.google('')}sync`)
    },
    isUserAuthenticatedByGoogle () {
        return service.get(`${API.google('')}isAuthenticated`)
    }
}