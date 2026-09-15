import { useEffect, useState } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [requestKey, setRequestKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetch(url, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        return response.json()
      })
      .then((result) => {
        setData(result)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => {
      controller.abort()
    }
  }, [url, requestKey])

  function refetch() {
    setLoading(true)
    setError('')
    setRequestKey((currentKey) => currentKey + 1)
  }

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export default useFetch
