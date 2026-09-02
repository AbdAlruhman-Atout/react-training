import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StudentForm from './components/StudentForm.jsx'
import RandomUser from './components/RandomUser.jsx'

function App() {
  return (
    <main>
      <h1>React Training</h1>

      <StudentForm />

      <RandomUser />

      <ToastContainer />
    </main>
  )
}

export default App
