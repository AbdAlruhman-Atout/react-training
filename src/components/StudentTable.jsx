function StudentTable({ students, onViewDetails, onDelete }) {
  if (students.length === 0) {
    return <p>No students registered yet.</p>
  }

  return (
    <div>
      <h2>Registered Students</h2>

      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>GPA</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.gpa}</td>

                <td>
                  <button type="button" onClick={() => onViewDetails(student)}>
                    View Details
                  </button>

                  <button type="button" onClick={() => onDelete(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentTable
