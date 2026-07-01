import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#1a1d27', borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="px-8 py-4 flex items-center justify-between">
      <span className="text-white font-extrabold text-xl tracking-tight">
        Route<span className="text-purple-400">X</span>
      </span>
      <div className="flex gap-6">
        <NavLink to="/" end className={({ isActive }) => `text-sm font-medium transition-all ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `text-sm font-medium transition-all ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `text-sm font-medium transition-all ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
          Contact
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar