import api from './api';

export const uploadFile = async (formData:FormData) => {
  const response = await api.post('/upload',formData)
  return response
}
