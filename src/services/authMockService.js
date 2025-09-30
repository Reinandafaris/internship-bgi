const dummyUser = { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' }
const dummyToken = 'ini-token-jwt-palsu-dari-mock-service'

export default {
  login(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
          resolve({ data: { user: dummyUser, token: dummyToken } })
        } else {
          reject({ response: { data: { message: 'Email atau password salah' } } })
        }
      }, 1000)
    })
  },
  // Fungsi register bisa ditambahkan di sini jika perlu
}
