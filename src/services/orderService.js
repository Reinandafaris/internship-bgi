import apiClient from './api'

export default {
  createOrder(orderData) {
    return apiClient.post('/orders', orderData)
  },

  getOrders() {
    return apiClient.get('/orders')
  },

  getOrderById(orderId) {
    return apiClient.get(`/orders/${orderId}`)
  },

  updateOrder(orderId, updatedData) {
    return apiClient.put(`/orders/${orderId}`, updatedData)
  },

  deleteOrder(orderId) {
    return apiClient.delete(`/orders/${orderId}`)
  },
}
