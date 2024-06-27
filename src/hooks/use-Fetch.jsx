import { useState } from "react"

const useFetch = (cb, options = {}) => {
  const [loading, setLoading] = useState()
  const [data, setData] = useState()
  const [error, setError] = useState()


  const fn = async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const response = await cb(options, ...args);
      setData(response)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, fn }

}

export default useFetch