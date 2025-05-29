import React, { useState, useEffect } from 'react';

function CustomerForm({ customer, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        whatsapp: customer.whatsapp || '',
        email: customer.email || '',
        notes: customer.notes || ''
      });
    } else {
      setFormData({
        name: '',
        whatsapp: '',
        email: '',
        notes: ''
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formStyle = {
    backgroundColor: '#2A2A2A',
    border: '1px solid #3A3A3A',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '500px',
    margin: '0 auto'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#F5F5DC'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #4A4A4A',
    borderRadius: '6px',
    backgroundColor: '#3A3A3A',
    color: '#F5F5DC',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  };

  const inputFocusStyle = {
    borderColor: '#D4AF37'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical'
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '12px',
    transition: 'background-color 0.2s ease'
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#D4AF37',
    color: '#1A1A1A'
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4A4A4A',
    color: '#F5F5DC'
  };

  return (
    <div style={formStyle}>
      <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: '#D4AF37' }}>
        {customer ? 'Editar Cliente' : 'Nuevo Cliente'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" style={labelStyle}>
            Nombre <span style={{ color: '#CC4444' }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
            onBlur={(e) => e.target.style.borderColor = '#4A4A4A'}
            required
            placeholder="Nombre completo del cliente"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="whatsapp" style={labelStyle}>
            WhatsApp
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
            onBlur={(e) => e.target.style.borderColor = '#4A4A4A'}
            placeholder="Ej: +57 300 123 4567"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
            onBlur={(e) => e.target.style.borderColor = '#4A4A4A'}
            placeholder="email@ejemplo.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="notes" style={labelStyle}>
            Notas
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            style={textareaStyle}
            onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
            onBlur={(e) => e.target.style.borderColor = '#4A4A4A'}
            placeholder="Preferencias de fragancia, observaciones especiales..."
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !formData.name.trim()}
            style={submitButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#C4A037'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#D4AF37'}
          >
            {isLoading ? 'Guardando...' : customer ? 'Actualizar' : 'Crear Cliente'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            style={cancelButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5A5A5A'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4A4A4A'}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerForm; 