import React from 'react'
import StatCard from '../componentes/ui/StatCard'
import { useState, useEffect } from 'react'
import { useAlquileres } from '../hooks/UseAlquileres';
import { useClientes } from '../hooks/UseClientes';
import { useVehiculos } from '../hooks/UseVehiculos';

export default function Dashboard() {

  const [autosDisponibles, setAutosDisponibles] = useState(0);
  const [recaudacionMes, setRecaudacionMes] = useState(0);
  const [clientesActivos, setClientesActivos] = useState(0);
  const [alquileresMes, setAlquileresMes] = useState(0);
  const{alquileres, loadingAlquiler, errorAlquiler, fetchAlquiler} = useAlquileres()
  const{clientes, loadingClientes, errorClientes, fetchClientes} = useClientes()
  const{vehiculos, loadingVehiculos, errorVehiculos, fetchVehiculos} = useVehiculos()
  const [loadingGlobal, setLoadingGlobal] = useState(false)
  

  const agrupadorVehiculosDisp = (conjunto)=>{
    return conjunto.filter((v)=>v.disponibleHoy)
  }

  useEffect(()=>{
    const stats = ()=>{
      if (!errorAlquiler && !errorClientes && !errorVehiculos){
        const cantidadAlquileres = alquileres.length
        const cantidadVehiculosDisponibles = (agrupadorVehiculosDisp(vehiculos).length)
        const cantidadClientes = clientes.length
        setAlquileresMes(cantidadAlquileres)
        setAutosDisponibles(cantidadVehiculosDisponibles)
        setClientesActivos(cantidadClientes)
      }
      
    }
    stats();
  }, [alquileres])

    const stats = [
    { label: 'Alquileres este mes', value: alquileresMes, icon: '📋' },
    { label: 'Recaudado este mes', value: recaudacionMes, icon: '💰' },
    { label: 'Autos disponibles hoy', value: autosDisponibles, icon: '🚗' },
    { label: 'Clientes activos', value: clientesActivos, icon: '👥' },
  ]

  return (
    <div>
      <h1 className="u-mb-32" style={{ color: 'var(--primary-blue)' }}>Dashboard</h1>

      <div className="stats-grid">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Alquileres Recientes</h2>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th><th>Patente Vehículo</th><th>Fecha Inicio</th><th>Fecha Fin</th>
              </tr>
            </thead>
            <tbody>
                {alquileres.map((alquiler)=>(
                  <tr key = {alquiler.id}><td>{alquiler.cliente_dni}</td><td>{alquiler.vehiculo_patente}</td><td>{alquiler.fechaDelnicio}</td><td>{alquiler.fechaFin}</td></tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
