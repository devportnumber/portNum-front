import { useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const useAxios = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async (url, method, requestBody, params) => {
    try {
      setLoading(true)
      let requestHeaders = { 'Content-Type': 'application/json' }

      const response = await axios({
        method,
        url,
        data: requestBody,
        params: params,
      })

      // if (response.status === 200) {
      setData(response.data)
      // }

      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return { data, loading, error, fetchData }
}
