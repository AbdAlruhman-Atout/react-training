import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StudentForm from './components/StudentForm.jsx'

function App() {
  return (
    <main>
      <h1>React Training</h1>

      <StudentForm />

      <ToastContainer />
    </main>
  )
}

export default App
