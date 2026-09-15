import { useState } from 'react'

function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  function validateForm() {
    const validationErrors = validate ? validate(values) : {}

    setErrors(validationErrors)

    return Object.keys(validationErrors).length === 0
  }

  function resetForm() {
    setValues(initialValues)
    setErrors({})
  }

  return {
    values,
    errors,
    handleChange,
    validateForm,
    resetForm,
  }
}

export default useForm
