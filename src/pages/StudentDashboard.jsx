import { useEffect, useState } from 'react'
import StudentForm from '../components/StudentForm.jsx'
import StudentList from '../components/StudentList.jsx'
import StudentModal from '../components/StudentModal.jsx'

function StudentDashboard() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students')

    return savedStudents ? JSON.parse(savedStudents) : []
  })
  const [selectedStudent, setSelectedStudent] = useState(null)

  function addStudent(student) {
    const newStudent = {
      ...student,
      id: Date.now(),
    }

    setStudents([...students, newStudent])
  }

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  return (
    <div>
      <h1>Student Dashboard</h1>

      <StudentForm onAddStudent={addStudent} />

      <p>Total students: {students.length}</p>

      <StudentList students={students} onViewDetails={setSelectedStudent} />

      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  )
}

export default StudentDashboard
