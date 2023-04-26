import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: 'http://localhost:3200/api'
})

api.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = Cookies.get('token')
  config.headers!.Authorization = `Bearer ${token}`
  return config
})

export default api