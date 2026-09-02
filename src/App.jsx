import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StudentDashboard from './pages/StudentDashboard.jsx'

function App() {
  return (
    <main>
      <StudentDashboard />
      <ToastContainer />
    </main>
  )
}

export default App
