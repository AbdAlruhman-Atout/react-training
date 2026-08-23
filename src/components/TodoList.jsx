import { useState } from 'react'
import TodoItem from './TodoItem.jsx'
import FilterButtons from './FilterButtons.jsx'
import Button from './Button.jsx'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  function addTodo() {
    if (text.trim() === '') {
      return
    }

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setText('')
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed
    }

    if (filter === 'completed') {
      return todo.completed
    }

    return true
  })

  return (
    <div>
      <h2>To-Do List</h2>

      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter a task"
      />

      <Button variant="primary" onClick={addTodo}>
        Add
      </Button>

      <div>
        <FilterButtons filter={filter} setFilter={setFilter} />
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
