import { useNavigate, useParams } from 'react-router-dom'

function StudentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const students = JSON.parse(localStorage.getItem('students')) || []

  const student = students.find((student) => String(student.id) === id)

  if (!student) {
    return (
      <div>
        <h1>Student Not Found</h1>
        <p>No student exists with ID {id}.</p>

        <button type="button" onClick={() => navigate('/students')}>
          Back to Students
        </button>
      </div>
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

      <button type="button" onClick={() => navigate('/students')}>
        Back to Students
      </button>
    </div>
  )
}

export default StudentDetails
