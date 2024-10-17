import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

axios.defaults.withCredentials = true

export const useAxios = <T = any,>() => {
  // Removed the trailing comma and space
  const [data, setData] = useState<T | null>(null) // Generic T to type `data`
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (
    url: string,
    method: string,
    requestBody?: any,
    params?: any
  ) => {
    try {
      setLoading(true)
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data: requestBody,
        params: params,
      })
      // console.log('useAXios response-' + JSON.stringify(response))
      // console.log('useAXios response.data-' + JSON.stringify(response.data))
      setData(response.data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, fetchData }
}
