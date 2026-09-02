import { useEffect, useState } from 'react'
import StudentForm from '../components/StudentForm.jsx'
import StudentTable from '../components/StudentTable.jsx'
import StudentModal from '../components/StudentModal.jsx'

function StudentDashboard() {
  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id))

    if (selectedStudent?.id === id) {
      setSelectedStudent(null)
    }
  }

  const [courseFilter, setCourseFilter] = useState('all')
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

  const filteredStudents = students.filter((student) => {
    if (courseFilter === 'all') {
      return true
    }

    return student.course === courseFilter
  })

  return (
    <div>
      <h1>Student Dashboard</h1>

      <StudentForm onAddStudent={addStudent} />

      <p>Total students: {students.length}</p>

      <div>
        <label htmlFor="courseFilter">Filter by course: </label>

        <select
          id="courseFilter"
          value={courseFilter}
          onChange={(event) => setCourseFilter(event.target.value)}
        >
          <option value="all">All Courses</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <StudentTable
        students={filteredStudents}
        onViewDetails={setSelectedStudent}
        onDelete={deleteStudent}
      />

      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  )
}

export default StudentDashboard
