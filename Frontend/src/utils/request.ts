import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

type ApiEnvelope<T> = {
  code?: number
  message?: string
  data?: T
}

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 12000,
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

request.interceptors.response.use(
  ((response: AxiosResponse<ApiEnvelope<unknown>>) => {
    if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
      return response.data
    }

    const payload = response.data
    if (payload && typeof payload === 'object' && 'code' in payload) {
      if (payload.code !== 200) {
        const error = new Error(payload.message || '请求失败')
        ;(error as Error & { response?: AxiosResponse }).response = response
        throw error
      }
      return payload.data
    }

    return response.data
  }) as any,
  ((error: AxiosError<ApiEnvelope<unknown>> | Error) => {
    if (axios.isAxiosError(error)) {
      // 只处理真正的HTTP错误，业务异常由组件自行处理
      if (error.response?.status === 401) {
        const userStore = useUserStore()
        userStore.logout()
      }
      ElMessage.error(error.response?.data?.message || error.message || '请求失败')
    }
    return Promise.reject(error)
  }) as any,
)

export const get = <T>(url: string, config?: AxiosRequestConfig) => request.get<any, T>(url, config)
export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => request.post<any, T>(url, data, config)
export const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => request.put<any, T>(url, data, config)
export const del = <T>(url: string, config?: AxiosRequestConfig) => request.delete<any, T>(url, config)

export default request
