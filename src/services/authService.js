import authApiService from './authApiService'
import authMockService from './authMockService'

const useMock = import.meta.env.VITE_APP_MOCK_API === 'true'
const authService = useMock ? authMockService : authApiService

export default authService
