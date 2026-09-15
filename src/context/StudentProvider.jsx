import { useEffect, useState } from 'react'
import StudentContext from './student-context.js'

function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students')

    return savedStudents ? JSON.parse(savedStudents) : []
  })

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  function addStudent(student) {
    const newStudent = {
      ...student,
      id: Date.now(),
    }

    setStudents((currentStudents) => [...currentStudents, newStudent])
  }

  function removeStudent(id) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== id),
    )
  }

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        removeStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export default StudentProvider
