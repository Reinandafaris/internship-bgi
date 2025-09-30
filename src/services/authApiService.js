import apiClient from './api'
export default {
  login(credentials) {
    return apiClient.post('/login', credentials)
  },
  register(userData) {
    return apiClient.post('/register', userData)
  },
}
