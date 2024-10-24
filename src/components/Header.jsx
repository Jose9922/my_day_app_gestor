import { useState } from 'react'

function Header({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      onAddTodo(newTodo)
      setNewTodo('')
    }
  }

  return (
<header>
<h1>My Day</h1>
<h2>All my tasks in one place</h2>
  <form onSubmit={handleSubmit}>
<input
  type="text"
  placeholder="Type new todo"
  value={newTodo}
  onChange={(e) => setNewTodo(e.target.value)}
  autoFocus/>
</form>
  </header>
  )
}

export default Header;