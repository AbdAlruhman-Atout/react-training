import { useState } from 'react'

import StudentForm from '../components/StudentForm.jsx'
import StudentModal from '../components/StudentModal.jsx'
import StudentTable from '../components/StudentTable.jsx'
import useStudents from '../hooks/useStudents.js'

function StudentDashboard() {
  const { students, removeStudent } = useStudents()

  const [courseFilter, setCourseFilter] = useState('all')
  const [selectedStudent, setSelectedStudent] = useState(null)

  function deleteStudent(id) {
    removeStudent(id)

    if (selectedStudent?.id === id) {
      setSelectedStudent(null)
    }
  }

  const filteredStudents = students.filter((student) => {
    if (courseFilter === 'all') {
      return true
    }

    return student.course === courseFilter
  })

  return (
    <div>
      <h1>Student Dashboard</h1>

      <StudentForm />

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
