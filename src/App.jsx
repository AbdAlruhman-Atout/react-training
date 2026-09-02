import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RandomUser from './components/RandomUser.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'

function App() {
  return (
    <main>
      <h1>React Training</h1>

      <StudentDashboard />

      <RandomUser />

      <ToastContainer />
    </main>
  )
}

export default App
