import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../componentes/SideBar'
import "../styles/layout.css"

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-container">
      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userName="Carlos Tevez" // A cambiar por {user} cuando impllementemos login
        userRole="Administrador"
      />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
