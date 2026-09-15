import { useState } from 'react'

import StudentContext from './student-context.js'
import useFetch from '../hooks/useFetch.js'

const STUDENTS_URL = 'http://localhost:3001/students'

function StudentProvider({ children }) {
  const { data, loading, error, refetch } = useFetch(STUDENTS_URL)

  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState('')

  const students = Array.isArray(data) ? data : []

  async function addStudent(student) {
    try {
      setActionLoading(true)
      setActionError('')

      const response = await fetch(STUDENTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      })

      if (!response.ok) {
        throw new Error('Failed to add student')
      }

      const createdStudent = await response.json()

      refetch()

      return createdStudent
    } catch (err) {
      setActionError(err.message)
      throw err
    } finally {
      setActionLoading(false)
    }
  }

  async function updateStudent(id, student) {
    try {
      setActionLoading(true)
      setActionError('')

      const response = await fetch(`${STUDENTS_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...student,
          id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update student')
      }

      const updatedStudent = await response.json()

      refetch()

      return updatedStudent
    } catch (err) {
      setActionError(err.message)
      throw err
    } finally {
      setActionLoading(false)
    }
  }

  async function removeStudent(id) {
    try {
      setActionLoading(true)
      setActionError('')

      const response = await fetch(`${STUDENTS_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete student')
      }

      refetch()
    } catch (err) {
      setActionError(err.message)
      throw err
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        actionLoading,
        actionError,
        addStudent,
        updateStudent,
        removeStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export default StudentProvider
