import apiClient from './api'

export default {
  getProducts() {
    return apiClient.get('/products')
  },
  getProductById(id) {
    return apiClient.get(`/products/${id}`)
  },
}
