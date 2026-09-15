import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import StudentForm from '../components/StudentForm.jsx'
import useStudents from '../hooks/useStudents.js'

function Students() {
  const {
    students,
    loading,
    error,
    actionLoading,
    actionError,
    removeStudent,
  } = useStudents()

  async function handleDelete(id) {
    try {
      await removeStudent(id)
      toast.success('Student deleted successfully')
    } catch {
      toast.error('Failed to delete student')
    }
  }

  return (
    <div>
      <h1>Students</h1>

      <StudentForm />

      {error && <p>Failed to load students: {error}</p>}

      {actionError && <p>Student action failed: {actionError}</p>}

      <h2>Registered Students</h2>

      {loading && students.length === 0 ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>{student.name}</Link>

              {' — '}
              {student.course}

              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleDelete(student.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Students
