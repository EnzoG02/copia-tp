import React, { useState } from 'react'
import Modal from '../../componentes/ui/Modal'
import FormInput from '../../componentes/form/FormInput'
import { useClientes } from '../../hooks/UseClientes'


export default function Clientes() {
  const [showModal, setShowModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const {clientes, loadingClientes, errorClientes, fetchClientes} = useClientes();

  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Clientes</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>➕ Agregar Cliente</button>
      </div>

      <div className="filters-container">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <input
            type="text" className="form-input" placeholder="🔍 Buscar por nombre o DNI..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr><th>Nombre</th><th>DNI</th><th>Email</th><th>Teléfono</th><th>Alquileres</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.dni}>
                  <td>{c.nombre}</td><td>{c.dni}</td><td>{c.email}</td><td>{c.telefono}</td>
                  <td><span className="badge badge-info">{7}</span></td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => setSelectedClient(c)}>Ver Detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Agregar Nuevo Cliente"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
            <button className="btn btn-success" onClick={() => setShowModal(false)}>Guardar Cliente</button>
          </>
        }
      >
        <FormInput label="Nombre Completo" placeholder="Ej: Juan Pérez" required />
        <FormInput label="DNI" placeholder="12345678" required />
        <div className="form-row">
          <FormInput label="Email" type="email" placeholder="cliente@email.com" />
          <FormInput label="Teléfono" placeholder="555-0000" />
        </div>
        <FormInput label="Dirección" placeholder="Calle 123, Ciudad" />
      </Modal>

      <Modal
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        title={`Detalle de Cliente: ${selectedClient?.nombre || ''}`}
        footer={<button className="btn btn-secondary" onClick={() => setSelectedClient(null)}>Volver</button>}
      >
        {selectedClient && (
          <>
            <div className="detail-grid">
              <div className="detail-item"><div className="detail-label">Nombre</div><div className="detail-value">{selectedClient.nombre}</div></div>
              <div className="detail-item"><div className="detail-label">DNI</div><div className="detail-value">{selectedClient.dni}</div></div>
              <div className="detail-item"><div className="detail-label">Email</div><div className="detail-value">{selectedClient.email}</div></div>
              <div className="detail-item"><div className="detail-label">Teléfono</div><div className="detail-value">{selectedClient.telefono}</div></div>
              <div className="detail-item"><div className="detail-label">Alquileres Totales</div><div className="detail-value">{7}</div></div>
            </div>

            <h3 style={{ marginTop: 24, marginBottom: 16, color: 'var(--primary-blue)' }}>Historial de Alquileres</h3>
            <table>
              <thead><th>Fecha Inicio</th><th>Fecha Fin</th><th>Patente Vehiculo</th><th>Dni Empleado</th></thead>
              <tbody>
                Aca meter la logica de los alquileres
              </tbody>

            </table>
          </>
        )}
      </Modal>
    </div>
  )
}
