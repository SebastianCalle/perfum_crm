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
    <div>
      <h3>Añadir Nueva Fragancia</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="internalName">Nombre Interno:*</label>
          <input
            id="internalName"
            type="text"
            value={internalName}
            onChange={(e) => setInternalName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="inspirationName">Nombre Inspiración:</label>
          <input
            id="inspirationName"
            type="text"
            value={inspirationName}
            onChange={(e) => setInspirationName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="house">Casa:</label>
          <input
            id="house"
            type="text"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="supplierName">Proveedor:</label>
          <input
            id="supplierName"
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="costPerG">Costo por Gramo:*</label>
          <input
            id="costPerG"
            type="number"
            step="0.01"
            value={costPerG}
            onChange={(e) => setCostPerG(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="stockG">Stock (g):</label>
          <input
            id="stockG"
            type="number"
            step="0.01"
            value={stockG}
            onChange={(e) => setStockG(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="minStockG">Stock Mínimo (g):</label>
          <input
            id="minStockG"
            type="number"
            step="0.01"
            value={minStockG}
            onChange={(e) => setMinStockG(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Añadiendo...' : 'Añadir Fragancia'}
        </button>
      </form>
    </div>
  );
}

export default AddFragranceForm; 