import { useContext } from 'react'
import StudentContext from '../context/student-context.js'

function useStudents() {
  const context = useContext(StudentContext)

  if (!context) {
    throw new Error('useStudents must be used inside StudentProvider')
  }

  return context
}

export default useStudents
