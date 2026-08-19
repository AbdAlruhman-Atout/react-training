function ProfileCard({
  name = 'Unknown User',
  title = 'No title provided',
  image = 'https://i.pravatar.cc/150?img=5',
}) {
  return (
    <div>
      <img src={image} alt={`${name} profile`} width="150" />

      <h2>{name}</h2>
      <p>{title}</p>
    </div>
  )
}

export default ProfileCard
