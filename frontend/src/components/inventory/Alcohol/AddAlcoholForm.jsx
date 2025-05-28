import React, { useState } from 'react';

function AddAlcoholForm({ onAlcoholAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseUnitCost, setPurchaseUnitCost] = useState('');
  const [purchaseUnitVolumeMl, setPurchaseUnitVolumeMl] = useState('');
  // cost_per_ml es calculado por el backend
  const [stockNotes, setStockNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    const alcoholData = {
      name,
      description: description || null,
      supplier_name: supplierName || null,
      purchase_date: purchaseDate || null,
      purchase_unit_cost: parseFloat(purchaseUnitCost),
      purchase_unit_volume_ml: parseFloat(purchaseUnitVolumeMl),
      stock_notes: stockNotes || null,
    };

    try {
      const response = await fetch('http://localhost:8000/inventory/alcohols/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alcoholData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      setSuccessMessage('¡Alcohol añadido con éxito!');
      // Limpiar formulario
      setName('');
      setDescription('');
      setSupplierName('');
      setPurchaseDate('');
      setPurchaseUnitCost('');
      setPurchaseUnitVolumeMl('');
      setStockNotes('');

      if (onAlcoholAdded) {
        onAlcoholAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Añadir Nuevo Tipo de Alcohol</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="alcoholName">Nombre (Tipo):*</label>
          <input id="alcoholName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="alcoholDescription">Descripción:</label>
          <textarea id="alcoholDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="alcoholSupplierName">Proveedor:</label>
          <input id="alcoholSupplierName" type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="alcoholPurchaseDate">Fecha de Compra:</label>
          <input id="alcoholPurchaseDate" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="alcoholPurchaseUnitCost">Costo Unit. Compra:*</label>
          <input id="alcoholPurchaseUnitCost" type="number" step="0.01" value={purchaseUnitCost} onChange={(e) => setPurchaseUnitCost(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="alcoholPurchaseUnitVolumeMl">Vol. Unit. Compra (ml):*</label>
          <input id="alcoholPurchaseUnitVolumeMl" type="number" step="0.01" value={purchaseUnitVolumeMl} onChange={(e) => setPurchaseUnitVolumeMl(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="alcoholStockNotes">Notas de Stock:</label>
          <textarea id="alcoholStockNotes" value={stockNotes} onChange={(e) => setStockNotes(e.target.value)} />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Añadiendo...' : 'Añadir Alcohol'}
        </button>
      </form>
    </div>
  );
}

export default AddAlcoholForm; 