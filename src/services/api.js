import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Arahkan ke JSON Server kita
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
