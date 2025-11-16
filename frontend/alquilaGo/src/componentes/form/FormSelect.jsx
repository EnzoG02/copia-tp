import React from 'react'

export default function FormSelect({ label, value, onChange, options = [], required }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
      </label>
      <select
        className="form-select"
        value={value ?? ''}
        onChange={e => onChange?.(e.target.value)}
        required={required}
      >
        <option value="">Seleccionar...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
