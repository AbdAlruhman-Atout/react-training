import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
  }

  function decrement() {
    setCount(count - 1)
  }

  return (
    <div>
      <h2>Counter</h2>

      <p>Count: {count}</p>

      <button type="button" onClick={decrement}>
        -
      </button>

      <button type="button" onClick={increment}>
        +
      </button>
    </div>
  )
}

export default Counter
