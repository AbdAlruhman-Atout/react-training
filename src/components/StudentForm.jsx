import { useState } from 'react'
import { toast } from 'react-toastify'

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    gpa: '',
  })

  const [errors, setErrors] = useState({})
  const [submittedStudent, setSubmittedStudent] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }

    if (!formData.course) {
      newErrors.course = 'Course is required'
    }

    if (formData.gpa === '') {
      newErrors.gpa = 'GPA is required'
    } else {
      const gpa = Number(formData.gpa)

      if (gpa < 0 || gpa > 4) {
        newErrors.gpa = 'GPA must be between 0 and 4'
      }
    }

    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the form errors')
      return
    }

    setSubmittedStudent(formData)
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
            value={formData.name}
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
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="course">Course</label>

          <select
            id="course"
            name="course"
            value={formData.course}
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
            value={formData.gpa}
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
