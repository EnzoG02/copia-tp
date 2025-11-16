import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlquileres } from '../../hooks/UseAlquileres'
import { useState } from 'react'
import Modal from '../../componentes/ui/Modal'

export default function Alquileres() {

    const navigate = useNavigate()
    const[showModal, setShowModal] = useState(false)
    const[selectedAlquiler, setSelectedAlquiler] = useState(null)
    const{alquileres, loadingAlquiler, errorAlquiler, fetchAlquiler} = useAlquileres()
    
return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Alquileres</h1>
        <button className="btn btn-primary" onClick={()=>{navigate("/alquileres/new")}} >➕ Nuevo Alquiler</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr><th>Dni Cliente</th><th>Dni Empleado</th><th>Patente</th><th>Fecha de Inicio</th><th>Fecha de Fin</th><th>Acciones</th></tr>
            </thead>
            <tbody>
                {alquileres.map((alquiler)=> (
                <tr key={alquiler.id}>
                <td>{alquiler.cliente_dni}</td>
                <td>{alquiler.empleado_dni}</td>
                <td>{alquiler.vehiculo_patente}</td>
                <td>{alquiler.fechaDelnicio}</td>
                <td>{alquiler.fechaFin}</td>
                <td><button className="btn btn-sm btn-primary" onClick={() => setSelectedAlquiler(alquiler)}>Ver Detalle</button></td>  
                </tr>  
                ))}
            </tbody>
          </table>
                <Modal
                    isOpen={!!selectedAlquiler}
                    onClose={() => setSelectedAlquiler(null)}
                    title={`Detalle de Alquiler: ${selectedAlquiler?.id || ''}`}
                    footer={<button className="btn btn-secondary" onClick={() => setSelectedAlquiler(null)}>Volver</button>}
                >
                   
                  {selectedAlquiler && (
                    <>
                      <div className="detail-grid">
                        <div className="detail-item"><div className="detail-label">Dni Cliente</div><div className="detail-value">{selectedAlquiler.cliente_dni}</div></div>
                        <div className="detail-item"><div className="detail-label">Fecha de Gestion</div><div className="detail-value">{selectedAlquiler.fechaDeGestion}</div></div>
                        <div className="detail-item"><div className="detail-label">Fecha de Inicio</div><div className="detail-value">{selectedAlquiler.fechaDelnicio}</div></div>
                        <div className="detail-item"><div className="detail-label">Modelo</div><div className="detail-value">{selectedAlquiler.vehiculo.modelo_id}</div></div>
                        <div className="detail-item"><div className="detail-label">Color Vehiculo</div><div className="detail-value">{selectedAlquiler.vehiculo.color}</div></div>
                      </div>
          
                      <h3 style={{ marginTop: 24, marginBottom: 16, color: 'var(--primary-blue)' }}>Cobro</h3>
                      <div className="list-item">
                        <div className="list-item-content">
                          <div className="list-item-title">Implementar Datos del cobro en esta parte</div>
                          <div className="list-item-subtitle">Cobros relacionados a mantenimiento y daños cuando se implenente</div>
                        </div>
                        <span className="badge badge-success">Completado</span>
                      </div>

                    </>
                  )}
                </Modal>
        </div>
      </div>
    </div>
  )
}
