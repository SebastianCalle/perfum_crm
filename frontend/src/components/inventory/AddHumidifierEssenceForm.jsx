import React, { useState } from 'react';

function AddHumidifierEssenceForm({ onHumidifierEssenceAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [costPerBottle, setCostPerBottle] = useState('');
  const [bottleVolumeMl, setBottleVolumeMl] = useState('');
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

    const essenceData = {
      name,
      description: description || null,
      supplier_name: supplierName || null,
      cost_per_bottle: parseFloat(costPerBottle),
      bottle_volume_ml: bottleVolumeMl ? parseFloat(bottleVolumeMl) : null,
      stock_units: parseInt(stockUnits, 10),
      min_stock_units: parseInt(minStockUnits, 10),
    };

    try {
      const response = await fetch('http://localhost:8000/inventory/humidifier-essences/', { // Ajusta el endpoint si es necesario
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(essenceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      setSuccessMessage('¡Esencia para humidificador añadida con éxito!');
      // Limpiar formulario
      setName('');
      setDescription('');
      setSupplierName('');
      setCostPerBottle('');
      setBottleVolumeMl('');
      setStockUnits('0');
      setMinStockUnits('0');

      if (onHumidifierEssenceAdded) {
        onHumidifierEssenceAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Añadir Nueva Esencia para Humidificador</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="essenceName">Nombre:*</label>
          <input id="essenceName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="essenceDescription">Descripción:</label>
          <textarea id="essenceDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="essenceSupplierName">Proveedor:</label>
          <input id="essenceSupplierName" type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="essenceCostPerBottle">Costo por Botella:*</label>
          <input id="essenceCostPerBottle" type="number" step="0.01" value={costPerBottle} onChange={(e) => setCostPerBottle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="essenceBottleVolumeMl">Volumen Botella (ml):</label>
          <input id="essenceBottleVolumeMl" type="number" step="0.01" value={bottleVolumeMl} onChange={(e) => setBottleVolumeMl(e.target.value)} />
        </div>
        <div>
          <label htmlFor="essenceStockUnits">Stock (unidades):</label>
          <input id="essenceStockUnits" type="number" value={stockUnits} onChange={(e) => setStockUnits(e.target.value)} />
        </div>
        <div>
          <label htmlFor="essenceMinStockUnits">Stock Mínimo (unidades):</label>
          <input id="essenceMinStockUnits" type="number" value={minStockUnits} onChange={(e) => setMinStockUnits(e.target.value)} />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Añadiendo...' : 'Añadir Esencia'}
        </button>
      </form>
    </div>
  );
}

export default AddHumidifierEssenceForm; 