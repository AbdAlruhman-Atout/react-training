import { Link } from 'react-router-dom'
import StudentForm from '../components/StudentForm.jsx'
import useStudents from '../hooks/useStudents.js'

function Students() {
  const { students, removeStudent } = useStudents()

  return (
    <div>
      <h1>Students</h1>

      <StudentForm />

      <h2>Registered Students</h2>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>{student.name}</Link>

              {' — '}
              {student.course}

              <button type="button" onClick={() => removeStudent(student.id)}>
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
