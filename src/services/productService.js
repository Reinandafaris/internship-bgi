import apiClient from './api'

export default {
  getProducts() {
    return apiClient.get('/products')
    // return new Promise((resolve) => setTimeout(() => resolve(apiClient.get('/products')), 20000))
  },
  getProductById(id) {
    return apiClient.get(`/products/${id}`)
  },
  createProduct(productData) {
    return apiClient.post('/products', productData)
  },
  updateProduct(id, productData) {
    return apiClient.put(`/products/${id}`, productData)
  },
  deleteProduct(id) {
    return apiClient.delete(`/products/${id}`)
  },
}
