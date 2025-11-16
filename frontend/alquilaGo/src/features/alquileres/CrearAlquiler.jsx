import React, { useState } from 'react'
import Loading from '../../componentes/ui/Loading'
import Modal from '../../componentes/ui/Modal'
import FormSelect from '../../componentes/form/FormSelect'
import FormInput from '../../componentes/form/FormInput'
function Steps({ steps, currentStep }) {
  return (
    <div className="steps-container">
      {steps.map((step, index) => (
        <div key={index} className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
          <div className="step-circle">{index < currentStep ? '✓' : index + 1}</div>
          <div className="step-label">{step}</div>
        </div>
      ))}
    </div>
  )
}

export default function CrearAlquiler() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ fechaInicio: '', fechaFin: '', vehiculoId: '', clienteId: '', metodoPago: '' })

  const steps = ['Fechas', 'Vehículo', 'Cliente', 'Resumen', 'Pago']

  const vehiculosDisponibles = [
    { id: 1, modelo: 'Corolla', marca: 'Toyota', año: 2023, color: 'Blanco', precioDia: 500 },
    { id: 2, modelo: 'Civic', marca: 'Honda', año: 2022, color: 'Negro', precioDia: 450 },
    { id: 3, modelo: 'Focus', marca: 'Ford',  año: 2023, color: 'Azul',  precioDia: 480 },
  ]
  const clientes = [
    { id: 1, nombre: 'Juan Pérez', dni: '12345678' },
    { id: 2, nombre: 'María González', dni: '23456789' },
  ]

  const handleNext = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)
  const handleBack = () => currentStep > 0 && setCurrentStep(currentStep - 1)

  const handleFinalizarPago = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false); setShowPaymentModal(false)
      alert('¡Alquiler registrado exitosamente! Seña del 40% cobrada.')
      setCurrentStep(0); setFormData({ fechaInicio: '', fechaFin: '', vehiculoId: '', clienteId: '', metodoPago: '' })
    }, 2000)
  }

  const calcularTotal = () => {
    if (!formData.fechaInicio || !formData.fechaFin || !formData.vehiculoId) return 0
    const v = vehiculosDisponibles.find(v => v.id === parseInt(formData.vehiculoId))
    const dias = Math.ceil((new Date(formData.fechaFin) - new Date(formData.fechaInicio)) / (1000*60*60*24))
    return v ? v.precioDia * dias : 0
  }

  return (
    <div>
      {loading && <Loading message="Procesando pago..." />}

      <div className="card-header">
        <h1 className="card-title">Nuevo Alquiler</h1>
        <button className="btn btn-secondary" onClick={() => setCurrentStep(0)}>↺ Reiniciar</button>
      </div>

      <div className="card">
        <Steps steps={steps} currentStep={currentStep} />

        {currentStep === 0 && (
          <div>
            <h3 style={{ marginBottom: 24, color: 'var(--primary-blue)' }}>Seleccionar Fechas de Alquiler</h3>
            <div className="form-row">
              <FormInput label="Fecha de Inicio" type="date" value={formData.fechaInicio} onChange={val => setFormData({ ...formData, fechaInicio: val })} required />
              <FormInput label="Fecha de Fin"    type="date" value={formData.fechaFin}    onChange={val => setFormData({ ...formData, fechaFin: val })} required />
            </div>
            <button className="btn btn-primary" onClick={handleNext} disabled={!formData.fechaInicio || !formData.fechaFin}>Continuar →</button>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h3 style={{ marginBottom: 24, color: 'var(--primary-blue)' }}>Seleccionar Vehículo Disponible</h3>
            {vehiculosDisponibles.map(v => (
              <div key={v.id} className={`vehicle-card ${formData.vehiculoId === String(v.id) ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, vehiculoId: String(v.id) })}>
                <div className="vehicle-header">
                  <div className="vehicle-info"><h3>{v.marca} {v.modelo}</h3><p style={{ color: 'var(--text-light)' }}>{v.año}</p></div>
                  <div className="vehicle-price">${v.precioDia}/día</div>
                </div>
                <div className="vehicle-details">
                  <div className="vehicle-detail"><strong>Color:</strong> {v.color}</div>
                  <div className="vehicle-detail"><strong>Año:</strong> {v.año}</div>
                </div>
              </div>
            ))}
            <div className="u-flex u-gap-12" style={{ marginTop: 24 }}>
              <button className="btn btn-secondary" onClick={handleBack}>← Volver</button>
              <button className="btn btn-primary" onClick={handleNext} disabled={!formData.vehiculoId}>Continuar →</button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 style={{ marginBottom: 24, color: 'var(--primary-blue)' }}>Seleccionar Cliente</h3>
            <FormSelect
              label="Cliente"
              value={formData.clienteId}
              onChange={val => setFormData({ ...formData, clienteId: val })}
              options={clientes.map(c => ({ value: c.id, label: `${c.nombre} - DNI: ${c.dni}` }))}
              required
            />
            <button className="btn btn-secondary btn-sm" style={{ marginBottom: 24 }}>➕ Crear Nuevo Cliente</button>
            <div className="u-flex u-gap-12">
              <button className="btn btn-secondary" onClick={handleBack}>← Volver</button>
              <button className="btn btn-primary" onClick={handleNext} disabled={!formData.clienteId}>Continuar →</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 style={{ marginBottom: 24, color: 'var(--primary-blue)' }}>Resumen del Alquiler</h3>
            <div className="detail-grid">
              <div className="detail-item"><div className="detail-label">Fecha Inicio</div><div className="detail-value">{formData.fechaInicio}</div></div>
              <div className="detail-item"><div className="detail-label">Fecha Fin</div><div className="detail-value">{formData.fechaFin}</div></div>
              <div className="detail-item"><div className="detail-label">Cliente</div><div className="detail-value">{clientes.find(c => c.id === parseInt(formData.clienteId))?.nombre}</div></div>
              <div className="detail-item"><div className="detail-label">DNI Cliente</div><div className="detail-value">{clientes.find(c => c.id === parseInt(formData.clienteId))?.dni}</div></div>
              <div className="detail-item"><div className="detail-label">Vehículo</div><div className="detail-value">
                {vehiculosDisponibles.find(v => v.id === parseInt(formData.vehiculoId))?.marca} {vehiculosDisponibles.find(v => v.id === parseInt(formData.vehiculoId))?.modelo}
              </div></div>
              <div className="detail-item"><div className="detail-label">Total</div><div className="detail-value" style={{ color: 'var(--accent-blue)', fontSize: 20 }}>${calcularTotal()}</div></div>
            </div>
            <div className="u-flex u-gap-12" style={{ marginTop: 24 }}>
              <button className="btn btn-secondary" onClick={handleBack}>← Volver</button>
              <button className="btn btn-primary" onClick={handleNext}>Continuar al Pago →</button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 style={{ marginBottom: 24, color: 'var(--primary-blue)' }}>Método de Pago</h3>
            <p style={{ marginBottom: 24, color: 'var(--text-light)' }}>
              Seña requerida: <strong style={{ color: 'var(--accent-blue)', fontSize: 20 }}>${(calcularTotal() * 0.4).toFixed(2)}</strong> (40% del total)
            </p>

            <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
              <div className={`vehicle-card ${formData.metodoPago === 'efectivo' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, metodoPago: 'efectivo' })}>
                <h3>💵 Efectivo</h3>
                <p style={{ color: 'var(--text-light)', marginTop: 8 }}>Pago en sucursal con código de validación</p>
              </div>
              <div className={`vehicle-card ${formData.metodoPago === 'tarjeta' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, metodoPago: 'tarjeta' })}>
                <h3>💳 Tarjeta de Crédito</h3>
                <p style={{ color: 'var(--text-light)', marginTop: 8 }}>Pago inmediato con tarjeta</p>
              </div>
            </div>

            {formData.metodoPago === 'efectivo' && (
              <div style={{ padding: 20, background: 'var(--light-gray)', borderRadius: 8, marginBottom: 24 }}>
                <FormInput label="Código de Validación" placeholder="Ingrese el código de la sucursal" />
              </div>
            )}

            <div className="u-flex u-gap-12">
              <button className="btn btn-secondary" onClick={handleBack}>← Volver</button>
              <button
                className="btn btn-success"
                onClick={() => formData.metodoPago === 'tarjeta' ? setShowPaymentModal(true) : handleFinalizarPago()}
                disabled={!formData.metodoPago}
              >
                Confirmar Pago
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Datos de Tarjeta de Crédito"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowPaymentModal(false)}>Cancelar</button>
            <button className="btn btn-success" onClick={handleFinalizarPago}>Procesar Pago</button>
          </>
        }
      >
        <FormInput label="Número de Tarjeta" placeholder="1234 5678 9012 3456" />
        <div className="form-row">
          <FormInput label="Fecha de Vencimiento" placeholder="MM/AA" />
          <FormInput label="CVV" placeholder="123" />
        </div>
        <FormInput label="Nombre del Titular" placeholder="Como aparece en la tarjeta" />
      </Modal>
    </div>
  )
}
