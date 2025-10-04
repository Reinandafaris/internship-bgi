import apiClient from './api'

export default {
  // Login adalah AKSI MENCARI user berdasarkan email & password
  // Ini dilakukan dengan GET dan query parameter
  login(credentials) {
    return apiClient.get(`/users?email=${credentials.email}&password=${credentials.password}`)
  },

  // Register adalah AKSI MEMBUAT user baru
  // Ini dilakukan dengan POST ke koleksi /users
  register(userData) {
    // Biarkan JSON server yang membuat ID
    return apiClient.post('/users', userData)
  },
}
