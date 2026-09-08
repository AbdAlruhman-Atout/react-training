import { Link } from 'react-router-dom'

function Students() {
  const students = JSON.parse(localStorage.getItem('students')) || []

  if (students.length === 0) {
    return (
      <div>
        <h1>Students</h1>
        <p>No students found.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Students</h1>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>{student.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Students
