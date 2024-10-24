import { NavLink } from 'react-router-dom'

function Footer({ todos, onClearCompleted }) {
  const pendingCount = todos.filter(todo => !todo.completed).length
  const hasCompleted = todos.some(todo => todo.completed)

  return (
  <footer id="footer">
  <span className="todo-count">
  <strong>{pendingCount}</strong> {pendingCount === 1 ? 'item' : 'items'} left
    </span>

<ul className="filters">
<li>
  <NavLink to="/all">All</NavLink>
</li>
<li>
  <NavLink to="/pending">Pending</NavLink>
</li>
<li>
  <NavLink to="/completed">Completed</NavLink>
</li>
</ul>

{hasCompleted && (
  <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
  )}
  </footer>
  )
}

export default Footer;