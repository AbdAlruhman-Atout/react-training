import Button from './Button.jsx'

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.text}
      </span>

      <Button variant="secondary" onClick={() => onToggle(todo.id)}>
        Toggle
      </Button>

      <Button variant="secondary" onClick={() => onDelete(todo.id)}>
        Delete
      </Button>
    </li>
  )
}

export default TodoItem
