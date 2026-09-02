function StudentModal({ student, onClose }) {
  if (!student) {
    return null
  }

  return (
    <div>
      <div>
        <h2>Student Details</h2>

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

        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default StudentModal
