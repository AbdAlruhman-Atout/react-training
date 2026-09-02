import { useEffect, useState } from 'react'

function RandomUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://randomuser.me/api/', {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        return response.json()
      })
      .then((data) => {
        setUser(data.results[0])
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
  }, [])

  async function handleNextUser() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('https://randomuser.me/api/')

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      const data = await response.json()
      setUser(data.results[0])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h2>Random User</h2>

      <img src={user.picture.large} alt={`${user.name.first} profile`} />

      <p>
        {user.name.first} {user.name.last}
      </p>

      <p>
        {user.location.city}, {user.location.country}
      </p>

      <button type="button" onClick={handleNextUser}>
        Next User
      </button>
    </div>
  )
}

export default RandomUser
