import React from 'react'
import { NavLink } from 'react-router-dom'

const menu = [
  { to: '/',          label: 'Dashboard'},
  { to: '/clientes',  label: 'Clientes'},
  { to: '/vehiculos', label: 'Vehículos' },
  { to: '/empleados', label: 'Empleados' },
  { to: '/alquileres',label: 'Alquileres' },
]

export default function Sidebar({ userName, userRole, isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">AlquilaGo</div>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{userName?.charAt(0) || 'U'}</div>
        <div className="user-info">
          <h4>{userName}</h4>
          <p>{userRole}</p>
        </div>
      </div>

      <ul className="sidebar-nav">
        {menu.map(item => (
          <li key={item.to} className="nav-item">
            <NavLink
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => { if (window.innerWidth <= 768) onClose?.() }}
              end={item.to === '/'}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
