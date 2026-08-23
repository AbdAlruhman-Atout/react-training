import Counter from './components/Counter.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import TodoList from './components/TodoList.jsx'

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

      <Counter />

      <TodoList />
    </main>
  )
}

export default App