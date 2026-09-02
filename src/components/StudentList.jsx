function StudentList({ students, onViewDetails }) {
  if (students.length === 0) {
    return <p>No students registered yet.</p>
  }

  return (
    <div>
      <h2>Registered Students</h2>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <strong>{student.name}</strong>
            <p>{student.course}</p>

            <button
              type="button"
              onClick={() => onViewDetails(student)}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentList