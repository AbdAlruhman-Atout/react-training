import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import StudentEditForm from '../components/StudentEditForm.jsx'
import useStudents from '../hooks/useStudents.js'

function StudentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [editing, setEditing] = useState(false)

  const { students, loading, error } = useStudents()

  if (loading && students.length === 0) {
    return <p>Loading student...</p>
  }

  if (error) {
    return <p>Failed to load students: {error}</p>
  }

  const student = students.find((student) => String(student.id) === id)

  if (!student) {
    return (
      <div>
        <h1>Student Not Found</h1>

        <button type="button" onClick={() => navigate('/students')}>
          Back to Students
        </button>
      </div>
    )
  }

  if (editing) {
    return (
      <StudentEditForm student={student} onCancel={() => setEditing(false)} />
    )
  }

  return (
    <div>
      <h1>Student Details</h1>

      <p>
        <strong>Name:</strong> {student.name}
      </p>

      <p>
        <strong>Email:</strong> {student.email}
      </p>

      <p>
        <strong>Course:</strong> {student.course}
      </p>

      <p>
        <strong>GPA:</strong> {student.gpa}
      </p>

      <button type="button" onClick={() => setEditing(true)}>
        Edit
      </button>

      <button type="button" onClick={() => navigate('/students')}>
        Back to Students
      </button>
    </div>
  )
}

export default StudentDetails
