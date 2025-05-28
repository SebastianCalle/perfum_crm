import React, { useState } from 'react';

function AddBottleForm({ onBottleAdded }) {
  const [name, setName] = useState('');
  const [capacityMl, setCapacityMl] = useState('');
  const [bottleType, setBottleType] = useState('');
  const [color, setColor] = useState('');
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

    const bottleData = {
      name,
      capacity_ml: parseInt(capacityMl, 10),
      bottle_type: bottleType || null,
      color: color || null,
      supplier_name: supplierName || null,
      cost_per_unit: parseFloat(costPerUnit),
      stock_units: parseInt(stockUnits, 10),
      min_stock_units: parseInt(minStockUnits, 10),
    };

    try {
      const response = await fetch('http://localhost:8000/inventory/bottles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bottleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      setSuccessMessage('¡Botella añadida con éxito!');
      setName('');
      setCapacityMl('');
      setBottleType('');
      setColor('');
      setSupplierName('');
      setCostPerUnit('');
      setStockUnits('0');
      setMinStockUnits('0');

      if (onBottleAdded) {
        onBottleAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Añadir Nueva Botella</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bottleName">Nombre:*</label>
          <input id="bottleName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="capacityMl">Capacidad (ml):*</label>
          <input id="capacityMl" type="number" value={capacityMl} onChange={(e) => setCapacityMl(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="bottleType">Tipo:</label>
          <input id="bottleType" type="text" value={bottleType} onChange={(e) => setBottleType(e.target.value)} />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input id="color" type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div>
          <label htmlFor="supplierNameBottle">Proveedor:</label>
          <input id="supplierNameBottle" type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="costPerUnit">Costo por Unidad:*</label>
          <input id="costPerUnit" type="number" step="0.01" value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="stockUnits">Stock (unidades):</label>
          <input id="stockUnits" type="number" value={stockUnits} onChange={(e) => setStockUnits(e.target.value)} />
        </div>
        <div>
          <label htmlFor="minStockUnits">Stock Mínimo (unidades):</label>
          <input id="minStockUnits" type="number" value={minStockUnits} onChange={(e) => setMinStockUnits(e.target.value)} />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Añadiendo...' : 'Añadir Botella'}
        </button>
      </form>
    </div>
  );
}

export default AddBottleForm; 