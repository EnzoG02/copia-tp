import React, { useState } from 'react'
import Modal from '../../componentes/ui/Modal'
import FormInput from '../../componentes/form/FormInput'
import FormSelect from '../../componentes/form/FormSelect'
import { useVehiculos } from '../../hooks/UseVehiculos'
import useMarcas from '../../hooks/UseMarcas'
import useModelos from '../../hooks/UseModelos'
export default function Vehiculos() {
  const [subView, setSubView] = useState('lista')
  const [showModal, setShowModal] = useState(false)
  const {vehiculos, loadingVehiculos, errorVehiculos, fetchVehiculos} = useVehiculos()
  const {marcas, loadingMarcas, errorMarcas, fetchMarcas} = useMarcas();
  const {modelos, loadingModelos, errorModelos, fetchModelos} = useModelos();
  const [marcaFiltrado, setMarcaFiltrado] = useState(null)
  
  const disponibilidadVehiculo = (v)=>{
    if(v.disponibleHoy){
      return (<td><span className="badge badge-success">Disponible</span></td>)
    }
    else{
      return (<td><span className="badge badge-danger">No Disponible</span></td>)
    }
  }

  return (
    <div>
      <div className="card-header">
        <h1 className="card-title">Vehículos</h1>
        <div className="u-flex u-gap-12">
          <button className={`btn ${subView === 'lista' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSubView('lista')}>Lista</button>
          <button className={`btn ${subView === 'marcas' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSubView('marcas')}>Marcas</button>
          <button className={`btn ${subView === 'modelos' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSubView('modelos')}>Modelos</button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>➕ Agregar</button>
        </div>
      </div>

      {subView === 'lista' && (
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr><th>Marca</th><th>Modelo</th><th>Año</th><th>Color</th><th>Precio/Día</th><th>Estado</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {vehiculos.map((v)=>(
                  <tr key={v.patente}>
                  <td>{v.modelo.marca_id}</td><td>{v.modelo.nombre}</td><td>{v.añoModelo}</td><td>{v.color}</td><td>{v.precioPorDia}</td>
                  {disponibilidadVehiculo(v)}
                  <td><button className="btn btn-sm btn-primary">Ver Detalle</button></td>
                </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      )}

      {subView === 'marcas' && (
        <div className="card">
          <h3 style={{ marginBottom: 20, color: 'var(--primary-blue)' }}>Marcas de Vehículos</h3>
          {marcas.map((m)=>(
            <div className="list-item" key={m.id}><div className="list-item-content"><div className="list-item-title">{m.nombre}</div><div className="list-item-subtitle">{m.modelos.length}</div></div></div>
          ))}
        </div>
      )}

      {subView === 'modelos' && (
        <div className="card">
          <h3 style={{ marginBottom: 20, color: 'var(--primary-blue)' }}>Modelos por Marca</h3>
          <FormSelect label="Seleccionar Marca" options={marcas.map((m)=>({value: m.id, label: m.nombre}))} onChange={(e)=>setMarcaFiltrado(e)} />
          <div style={{ marginTop: 20 }}>
            {modelos.map((m)=>(
              <div className="list-item" key={m.id}><div className="list-item-content"><div className="list-item-title">{m.nombre}</div><div className="list-item-subtitle">{m.stock} unidades</div></div></div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Agregar ${subView === 'marcas' ? 'Marca' : subView === 'modelos' ? 'Modelo' : 'Vehículo'}`}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
            <button className="btn btn-success" onClick={() => setShowModal(false)}>Guardar</button>
          </>
        }
      >
        {subView === 'lista' && (
          <>
            <FormSelect label="Marca" options={[{ value: 'toyota', label: 'Toyota' }, { value: 'honda', label: 'Honda' }]} required />
            <FormSelect label="Modelo" options={[{ value: 'corolla', label: 'Corolla' }, { value: 'civic', label: 'Civic' }]} required />
            <div className="form-row">
              <FormInput label="Año" type="number" placeholder="2023" required />
              <FormInput label="Color" placeholder="Blanco" required />
            </div>
            <FormInput label="Precio por Día" type="number" placeholder="500" required />
            <FormInput label="Patente" placeholder="ABC123" required />
          </>
        )}
        {subView === 'marcas' && <FormInput label="Nombre de la Marca" placeholder="Ej: Toyota" required />}
        {subView === 'modelos' && (
          <>
            <FormSelect label="Marca" options={[{ value: 'toyota', label: 'Toyota' }, { value: 'honda', label: 'Honda' }]} required />
            <FormInput label="Nombre del Modelo" placeholder="Ej: Corolla" required />
            <FormSelect label="Tipo" options={[{ value: 'sedan', label: 'Sedán' }, { value: 'suv', label: 'SUV' }, { value: 'pickup', label: 'Pickup' }]} required />
          </>
        )}
      </Modal>
    </div>
  )
}
