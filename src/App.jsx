import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('mydayapp-reactjs')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  useEffect(() => {
    localStorage.setItem('mydayapp-reactjs', JSON.stringify(todos))
  }, [todos])

  const addTodo = (title) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newTitle) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle.trim() } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  return (
<Router>
  <div className="app">
<Header onAddTodo={addTodo} />
        
{todos.length > 0 && (
  <>
  <main id="main">
<Routes>
<Route path="/all" element={
  <TodoList
    todos={todos}
    onToggle={toggleTodo}
    onDelete={deleteTodo}
    onEdit={editTodo}
  />
} />
<Route path="/pending" element={
  <TodoList
    todos={todos.filter(todo => !todo.completed)}
    onToggle={toggleTodo}
    onDelete={deleteTodo}
    onEdit={editTodo}
  />
} />
<Route path="/completed" element={
  <TodoList
    todos={todos.filter(todo => todo.completed)}
    onToggle={toggleTodo}
    onDelete={deleteTodo}
    onEdit={editTodo}
  />
} />
<Route path="*" element={<Navigate to="/all" replace />} />
</Routes>
  </main>
<Footer
  todos={todos}
 onClearCompleted={clearCompleted}/>
</>
  )}
</div>
  </Router>
  )
}

export default App