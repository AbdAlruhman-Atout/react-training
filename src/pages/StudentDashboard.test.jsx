import { beforeEach, expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StudentDashboard from './StudentDashboard.jsx'

beforeEach(() => {
  localStorage.clear()
})

test('rejects an invalid student submission', async () => {
  const user = userEvent.setup()

  render(<StudentDashboard />)

  await user.click(screen.getByRole('button', { name: 'Register' }))

  expect(screen.getByText('Name is required')).toBeInTheDocument()
  expect(screen.getByText('Email is required')).toBeInTheDocument()
  expect(screen.getByText('Course is required')).toBeInTheDocument()
  expect(screen.getByText('GPA is required')).toBeInTheDocument()

  expect(screen.getByText('Total students: 0')).toBeInTheDocument()
})

test('valid submission adds a student row to the table', async () => {
  const user = userEvent.setup()

  render(<StudentDashboard />)

  await user.type(screen.getByLabelText('Name'), 'Alice Smith')
  await user.type(screen.getByLabelText('Email'), 'alice@example.com')

  await user.selectOptions(screen.getByLabelText('Course'), 'Computer Science')

  await user.type(screen.getByLabelText('GPA'), '3.5')

  await user.click(screen.getByRole('button', { name: 'Register' }))

  expect(screen.getByText('Total students: 1')).toBeInTheDocument()

  const table = screen.getByRole('table')

  expect(
    within(table).getByRole('cell', { name: 'Alice Smith' }),
  ).toBeInTheDocument()

  expect(
    within(table).getByRole('cell', { name: 'Computer Science' }),
  ).toBeInTheDocument()

  expect(within(table).getByRole('cell', { name: '3.5' })).toBeInTheDocument()
})

test('renders the expected number of student rows', () => {
  const students = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice@example.com',
      course: 'Computer Science',
      gpa: '3.5',
    },
    {
      id: 2,
      name: 'Bob Jones',
      email: 'bob@example.com',
      course: 'Engineering',
      gpa: '3.2',
    },
    {
      id: 3,
      name: 'Sara Ali',
      email: 'sara@example.com',
      course: 'Business',
      gpa: '3.8',
    },
  ]

  localStorage.setItem('students', JSON.stringify(students))

  render(<StudentDashboard />)

  const table = screen.getByRole('table')
  const rows = within(table).getAllByRole('row')

  // One header row + three student rows
  expect(rows).toHaveLength(4)

  expect(screen.getByText('Total students: 3')).toBeInTheDocument()
})

test('filters students by course', async () => {
  const user = userEvent.setup()

  const students = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice@example.com',
      course: 'Computer Science',
      gpa: '3.5',
    },
    {
      id: 2,
      name: 'Bob Jones',
      email: 'bob@example.com',
      course: 'Engineering',
      gpa: '3.2',
    },
  ]

  localStorage.setItem('students', JSON.stringify(students))

  render(<StudentDashboard />)

  await user.selectOptions(
    screen.getByLabelText('Filter by course:'),
    'Engineering',
  )

  const table = screen.getByRole('table')

  expect(
    within(table).getByRole('cell', { name: 'Bob Jones' }),
  ).toBeInTheDocument()

  expect(
    within(table).queryByRole('cell', { name: 'Alice Smith' }),
  ).not.toBeInTheDocument()
})

test('deletes a student from the table', async () => {
  const user = userEvent.setup()

  const students = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice@example.com',
      course: 'Computer Science',
      gpa: '3.5',
    },
  ]

  localStorage.setItem('students', JSON.stringify(students))

  render(<StudentDashboard />)

  expect(screen.getByRole('cell', { name: 'Alice Smith' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Delete' }))

  expect(
    screen.queryByRole('cell', { name: 'Alice Smith' }),
  ).not.toBeInTheDocument()

  expect(screen.getByText('Total students: 0')).toBeInTheDocument()
})
