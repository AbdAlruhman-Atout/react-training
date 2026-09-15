import { useState } from 'react'
import { toast } from 'react-toastify'

import useForm from '../hooks/useForm.js'
import useStudents from '../hooks/useStudents.js'

const initialValues = {
  name: '',
  email: '',
  course: '',
  gpa: '',
}

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

function StudentForm() {
  const { addStudent } = useStudents()
  const [submittedStudent, setSubmittedStudent] = useState(null)

  const { values, errors, handleChange, validateForm } = useForm(
    initialValues,
    validateStudent,
  )

  function handleSubmit(event) {
    event.preventDefault()

    const isValid = validateForm()

    if (!isValid) {
      toast.error('Please fix the form errors')
      return
    }

    addStudent(values)
    setSubmittedStudent(values)

    toast.success('Student registered successfully')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Student Registration</h2>

        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />

          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />

          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="course">Course</label>

          <select
            id="course"
            name="course"
            value={values.course}
            onChange={handleChange}
          >
            <option value="">Select a course</option>

            <option value="Computer Science">Computer Science</option>

            <option value="Engineering">Engineering</option>

            <option value="Business">Business</option>
          </select>

          {errors.course && <p>{errors.course}</p>}
        </div>

        <div>
          <label htmlFor="gpa">GPA</label>

          <input
            id="gpa"
            name="gpa"
            type="number"
            step="0.01"
            value={values.gpa}
            onChange={handleChange}
          />

          {errors.gpa && <p>{errors.gpa}</p>}
        </div>

        <button type="submit">Register</button>
      </form>

      {submittedStudent && (
        <div>
          <h2>Student Preview</h2>

          <p>Name: {submittedStudent.name}</p>
          <p>Email: {submittedStudent.email}</p>
          <p>Course: {submittedStudent.course}</p>
          <p>GPA: {submittedStudent.gpa}</p>
        </div>
      )}
    </div>
  )
}

export default StudentForm
