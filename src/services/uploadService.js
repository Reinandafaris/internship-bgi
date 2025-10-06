import apiClient from './api'

export default {
  uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file)

    return apiClient.post('/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
