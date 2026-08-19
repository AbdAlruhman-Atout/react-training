import ProfileCard from './components/ProfileCard.jsx'

function App() {
  return (
    <main>
      <h1>React Training</h1>

      <ProfileCard
        name="Abdalruhman Atout"
        title="Software Developer"
        image="https://i.pravatar.cc/150?img=1"
      />

      <ProfileCard
        name="Ahmad Khalil"
        title="Frontend Developer"
        image="https://i.pravatar.cc/150?img=2"
      />

      <ProfileCard />
    </main>
  )
}

export default App
