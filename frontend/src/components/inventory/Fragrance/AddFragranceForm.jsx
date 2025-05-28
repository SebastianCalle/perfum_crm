import React, { useState } from 'react';

function AddFragranceForm({ onFragranceAdded }) {
  const [internalName, setInternalName] = useState('');
  const [inspirationName, setInspirationName] = useState('');
  const [house, setHouse] = useState('');
  const [description, setDescription] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [costPerG, setCostPerG] = useState('');
  const [stockG, setStockG] = useState('0.0');
  const [minStockG, setMinStockG] = useState('0.0');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    const fragranceData = {
      internal_name: internalName,
      inspiration_name: inspirationName || null,
      house: house || null,
      description: description || null,
      supplier_name: supplierName || null,
      cost_per_g: parseFloat(costPerG),
      stock_g: parseFloat(stockG),
      min_stock_g: parseFloat(minStockG),
    };

    try {
      const response = await fetch('http://localhost:8000/inventory/fragrances/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fragranceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      // const newFragrance = await response.json(); // Opcional: usar los datos retornados
      setSuccessMessage('¡Fragancia añadida con éxito!');
      
      // Limpiar formulario
      setInternalName('');
      setInspirationName('');
      setHouse('');
      setDescription('');
      setSupplierName('');
      setCostPerG('');
      setStockG('0.0');
      setMinStockG('0.0');

      if (onFragranceAdded) {
        onFragranceAdded(); // Llamar al callback para refrescar la lista
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-primary-200 p-8" style={{ backgroundColor: '#2A2A2A', borderColor: '#3A3A3A' }}>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-primary-900 mb-2" style={{ color: '#F5F5DC' }}>Añadir Nueva Fragancia</h3>
        <p className="text-primary-600" style={{ color: '#B8B8B8' }}>Complete los campos para registrar una nueva fragancia en el inventario.</p>
      </div>

      {/* Mensajes de estado */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 font-medium">Error: {error}</span>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid de campos principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre Interno */}
          <div>
            <label htmlFor="internalName" className="block text-sm font-semibold text-primary-900 mb-2" style={{ color: '#F5F5DC' }}>
              Nombre Interno <span className="text-red-500">*</span>
            </label>
            <input
              id="internalName"
              type="text"
              value={internalName}
              onChange={(e) => setInternalName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              style={{ backgroundColor: '#3A3A3A', borderColor: '#4A4A4A', color: '#F5F5DC' }}
              placeholder="Ej: Fragint-001"
            />
          </div>

          {/* Nombre Inspiración */}
          <div>
            <label htmlFor="inspirationName" className="block text-sm font-semibold text-primary-900 mb-2" style={{ color: '#F5F5DC' }}>
              Nombre Inspiración
            </label>
            <input
              id="inspirationName"
              type="text"
              value={inspirationName}
              onChange={(e) => setInspirationName(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              style={{ backgroundColor: '#3A3A3A', borderColor: '#4A4A4A', color: '#F5F5DC' }}
              placeholder="Ej: Inspiration C-79"
            />
          </div>

          {/* Casa */}
          <div>
            <label htmlFor="house" className="block text-sm font-semibold text-primary-900 mb-2" style={{ color: '#F5F5DC' }}>
              Casa
            </label>
            <input
              id="house"
              type="text"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              style={{ backgroundColor: '#3A3A3A', borderColor: '#4A4A4A', color: '#F5F5DC' }}
              placeholder="Ej: House X"
            />
          </div>

          {/* Proveedor */}
          <div>
            <label htmlFor="supplierName" className="block text-sm font-semibold text-primary-900 mb-2" style={{ color: '#F5F5DC' }}>
              Proveedor
            </label>
            <input
              id="supplierName"
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              style={{ backgroundColor: '#3A3A3A', borderColor: '#4A4A4A', color: '#F5F5DC' }}
              placeholder="Ej: Fragrance Supplies Co."
            />
          </div>
        </div>

        {/* Descripción - Campo completo */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-primary-900 mb-2" style={{ color: '#F5F5DC' }}>
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300 resize-none"
            style={{ backgroundColor: '#3A3A3A', borderColor: '#4A4A4A', color: '#F5F5DC' }}
            placeholder="Descripción de la fragancia..."
          />
        </div>

        {/* Grid de campos numéricos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Costo por Gramo */}
          <div>
            <label htmlFor="costPerG" className="block text-sm font-semibold text-primary-900 mb-2" style={{ color: '#F5F5DC' }}>
              Costo por Gramo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-primary-600 font-medium" style={{ color: '#D4AF37' }}>$</span>
              <input
                id="costPerG"
                type="number"
                step="0.01"
                value={costPerG}
                onChange={(e) => setCostPerG(e.target.value)}
                required
                className="w-full pl-8 pr-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
                style={{ backgroundColor: '#3A3A3A', borderColor: '#4A4A4A', color: '#F5F5DC' }}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stockG" className="block text-sm font-semibold text-primary-900 mb-2" style={{ color: '#F5F5DC' }}>
              Stock (g)
            </label>
            <input
              id="stockG"
              type="number"
              step="0.01"
              value={stockG}
              onChange={(e) => setStockG(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
              style={{ backgroundColor: '#3A3A3A', borderColor: '#4A4A4A', color: '#F5F5DC' }}
              placeholder="0.00"
            />
          </div>

          {/* Stock Mínimo */}
          <div>
            <label htmlFor="minStockG" className="block text-sm font-semibold text-primary-900 mb-2" style={{ color: '#F5F5DC' }}>
              Stock Mínimo (g)
            </label>
            <input
              id="minStockG"
              type="number"
              step="0.01"
              value={minStockG}
              onChange={(e) => setMinStockG(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
              style={{ backgroundColor: '#3A3A3A', borderColor: '#4A4A4A', color: '#F5F5DC' }}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Botón de envío */}
        <div className="pt-6 border-t border-primary-200" style={{ borderColor: '#3A3A3A' }}>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-auto px-8 py-3 font-semibold rounded-lg transition-all duration-200 ${
              isLoading
                ? 'bg-primary-300 text-primary-600 cursor-not-allowed'
                : 'bg-primary-900 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
            }`}
            style={{
              backgroundColor: isLoading ? '#4A4A4A' : '#D4AF37',
              color: isLoading ? '#B8B8B8' : '#1A1A1A'
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Añadiendo...
              </div>
            ) : (
              'Añadir Fragancia'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFragranceForm; 