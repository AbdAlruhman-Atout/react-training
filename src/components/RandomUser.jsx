import useFetch from '../hooks/useFetch.js'

function RandomUser() {
  const { data, loading, error, refetch } = useFetch(
    'https://randomuser.me/api/',
  )

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>

        <button type="button" onClick={refetch}>
          Try Again
        </button>
      </div>
    )
  }

  const user = data?.results?.[0]

  if (!user) {
    return <p>No user found.</p>
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

      <button type="button" onClick={refetch}>
        Next User
      </button>
    </div>
  )
}

export default RandomUser
