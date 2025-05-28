import React, { useState } from 'react';

function AddHumidifierForm({ onHumidifierAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [costPerUnit, setCostPerUnit] = useState('');
  const [stockUnits, setStockUnits] = useState('0');
  const [minStockUnits, setMinStockUnits] = useState('0');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    const humidifierData = {
      name,
      description: description || null,
      supplier_name: supplierName || null,
      cost_per_unit: parseFloat(costPerUnit),
      stock_units: parseInt(stockUnits, 10),
      min_stock_units: parseInt(minStockUnits, 10),
    };

    try {
      const response = await fetch('http://localhost:8000/inventory/humidifiers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(humidifierData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      setSuccessMessage('¡Humidificador añadido con éxito!');
      // Limpiar formulario
      setName('');
      setDescription('');
      setSupplierName('');
      setCostPerUnit('');
      setStockUnits('0');
      setMinStockUnits('0');

      if (onHumidifierAdded) {
        onHumidifierAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Añadir Nuevo Humidificador</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="humidifierName">Nombre:*</label>
          <input id="humidifierName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="humidifierDescription">Descripción:</label>
          <textarea id="humidifierDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="humidifierSupplierName">Proveedor:</label>
          <input id="humidifierSupplierName" type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="humidifierCostPerUnit">Costo por Unidad:*</label>
          <input id="humidifierCostPerUnit" type="number" step="0.01" value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="humidifierStockUnits">Stock (unidades):</label>
          <input id="humidifierStockUnits" type="number" value={stockUnits} onChange={(e) => setStockUnits(e.target.value)} />
        </div>
        <div>
          <label htmlFor="humidifierMinStockUnits">Stock Mínimo (unidades):</label>
          <input id="humidifierMinStockUnits" type="number" value={minStockUnits} onChange={(e) => setMinStockUnits(e.target.value)} />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Añadiendo...' : 'Añadir Humidificador'}
        </button>
      </form>
    </div>
  );
}

export default AddHumidifierForm; 