import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseCommon } from '../types/model/common'

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ResponseCommon<T>>> => {
  const response = await axiosInstance.get(url, config)
  return response
}
