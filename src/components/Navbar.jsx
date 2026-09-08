import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>

      <NavLink
        to="/students"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Students
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        About
      </NavLink>
    </nav>
  )
}

export default Navbar
