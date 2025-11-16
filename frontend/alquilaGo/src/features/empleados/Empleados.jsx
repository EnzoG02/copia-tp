import React from 'react'

export default function Empleados() {
  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Empleados</h1>
        <button className="btn btn-primary">➕ Agregar Empleado</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr><th>Nombre</th><th>DNI</th><th>Cargo</th><th>Email</th><th>Estado</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Ana Martínez</td><td>45678901</td><td>Gerente</td><td>ana@autorent.com</td>
                <td><span className="badge badge-success">Activo</span></td>
                <td><button className="btn btn-sm btn-primary">Ver Detalle</button></td>
              </tr>
              <tr>
                <td>Luis Fernández</td><td>56789012</td><td>Vendedor</td><td>luis@autorent.com</td>
                <td><span className="badge badge-success">Activo</span></td>
                <td><button className="btn btn-sm btn-primary">Ver Detalle</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
