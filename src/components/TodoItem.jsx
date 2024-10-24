import { useState, useRef, useEffect } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)
  const editInputRef = useRef(null)

useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus()
    }
}, [isEditing])

const handleSubmit = (e) => {
    e.preventDefault()
    if (editValue.trim()) {
    onEdit(todo.id, editValue)
    setIsEditing(false)
  }
}

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
    setEditValue(todo.title)
    setIsEditing(false)
  }
}

  return (
<li className={`${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
  {isEditing ? (
<form onSubmit={handleSubmit}>
  <input
    ref={editInputRef}
    type="text"
    value={editValue}
    onChange={(e) => setEditValue(e.target.value)}
    onKeyDown={handleKeyDown}
    onBlur={handleSubmit}
  />
</form>
  ) : (
<div className="view">
<input
  type="checkbox"
  checked={todo.completed}
  onChange={() => onToggle(todo.id)}
/>
<label onDoubleClick={() => setIsEditing(true)}>
    {todo.title}
  </label>
<button className="destroy" onClick={() => onDelete(todo.id)}>Delete</button>
</div>
      )}
    </li>
  )
}

export default TodoItem;