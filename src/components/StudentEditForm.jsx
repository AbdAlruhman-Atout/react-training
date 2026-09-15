import { toast } from 'react-toastify'

import useForm from '../hooks/useForm.js'
import useStudents from '../hooks/useStudents.js'

function validateStudent(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  }

  if (!values.course) {
    errors.course = 'Course is required'
  }

  if (values.gpa === '') {
    errors.gpa = 'GPA is required'
  } else {
    const gpa = Number(values.gpa)

    if (gpa < 0 || gpa > 4) {
      errors.gpa = 'GPA must be between 0 and 4'
    }
  }

  return errors
}

function StudentEditForm({ student, onCancel }) {
  const { updateStudent, actionLoading } = useStudents()

  const { values, errors, handleChange, validateForm } = useForm(
    {
      name: student.name,
      email: student.email,
      course: student.course,
      gpa: student.gpa,
    },
    validateStudent,
  )

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the form errors')
      return
    }

    try {
      await updateStudent(student.id, values)

      toast.success('Student updated successfully')
      onCancel()
    } catch {
      toast.error('Failed to update student')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>

      <div>
        <label htmlFor="edit-name">Name</label>
        <input
          id="edit-name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="edit-email">Email</label>
        <input
          id="edit-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="edit-course">Course</label>
        <select
          id="edit-course"
          name="course"
          value={values.course}
          onChange={handleChange}
        >
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <div>
        <label htmlFor="edit-gpa">GPA</label>
        <input
          id="edit-gpa"
          name="gpa"
          type="number"
          step="0.01"
          value={values.gpa}
          onChange={handleChange}
        />
        {errors.gpa && <p>{errors.gpa}</p>}
      </div>

      <button type="submit" disabled={actionLoading}>
        {actionLoading ? 'Saving...' : 'Save Changes'}
      </button>

      <button type="button" onClick={onCancel} disabled={actionLoading}>
        Cancel
      </button>
    </form>
  )
}

export default StudentEditForm
