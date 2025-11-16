import React from 'react'

export default function FormInput({ label, type='text', value, onChange, placeholder, required }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
      </label>
      <input
        type={type}
        className="form-input"
        value={value ?? ''}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
