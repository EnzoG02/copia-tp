import React from 'react'

export default function Loading({ message = 'Cargando...' }) {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <div className="loading-text">{message}</div>
    </div>
  )
}
