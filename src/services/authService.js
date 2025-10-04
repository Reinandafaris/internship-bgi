import authApiService from './authApiService'
import authMockService from './authMockService'

const useMock = import.meta.env.VITE_APP_MOCK_API === 'true'
let authService = {}

// Pilih service yang akan digunakan berdasarkan "saklar"
if (useMock) {
  authService = {
    login: authMockService.login,
    register: authMockService.register,
  }
} else {
  authService = {
    login: authApiService.login,
    register: authApiService.register,
  }
}

export default authService
