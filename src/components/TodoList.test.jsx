import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from './TodoList.jsx'
import { test, expect } from 'vitest'

test('adds a new todo', async () => {
  const user = userEvent.setup()

  render(<TodoList />)

  const input = screen.getByPlaceholderText('Enter a task')
  const addButton = screen.getByRole('button', { name: 'Add' })

  await user.type(input, 'Study React')
  await user.click(addButton)

  expect(screen.getByText('Study React')).toBeInTheDocument()
})

test('deletes a todo', async () => {
  const user = userEvent.setup()

  render(<TodoList />)

  const input = screen.getByPlaceholderText('Enter a task')
  const addButton = screen.getByRole('button', { name: 'Add' })

  await user.type(input, 'Study React')
  await user.click(addButton)

  expect(screen.getByText('Study React')).toBeInTheDocument()

  const deleteButton = screen.getByRole('button', { name: 'Delete' })
  await user.click(deleteButton)

  expect(screen.queryByText('Study React')).not.toBeInTheDocument()
})

test('toggles a todo as completed', async () => {
  const user = userEvent.setup()

  render(<TodoList />)

  const input = screen.getByPlaceholderText('Enter a task')
  const addButton = screen.getByRole('button', { name: 'Add' })

  await user.type(input, 'Study React')
  await user.click(addButton)

  const todoText = screen.getByText('Study React')
  const toggleButton = screen.getByRole('button', { name: 'Toggle' })

  expect(todoText).toHaveStyle('text-decoration: none')

  await user.click(toggleButton)

  expect(todoText).toHaveStyle('text-decoration: line-through')
})
