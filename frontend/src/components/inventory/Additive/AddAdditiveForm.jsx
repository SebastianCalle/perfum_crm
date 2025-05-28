import React, { useState } from 'react';

function AddAdditiveForm({ onAdditiveAdded }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [purchaseUnitCost, setPurchaseUnitCost] = useState('');
  const [purchaseUnitVolumeMl, setPurchaseUnitVolumeMl] = useState('');
  const [costPerApplicationEstimate, setCostPerApplicationEstimate] = useState('');
  const [stockNotes, setStockNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    const additiveData = {
      name,
      type: type || null,
      description: description || null,
      supplier_name: supplierName || null,
      purchase_unit_cost: parseFloat(purchaseUnitCost),
      purchase_unit_volume_ml: parseFloat(purchaseUnitVolumeMl),
      cost_per_application_estimate: parseFloat(costPerApplicationEstimate),
      stock_notes: stockNotes || null,
    };

    try {
      const response = await fetch('http://localhost:8000/inventory/additives/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(additiveData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      setSuccessMessage('¡Aditivo añadido con éxito!');
      // Limpiar formulario
      setName('');
      setType('');
      setDescription('');
      setSupplierName('');
      setPurchaseUnitCost('');
      setPurchaseUnitVolumeMl('');
      setCostPerApplicationEstimate('');
      setStockNotes('');

      if (onAdditiveAdded) {
        onAdditiveAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Añadir Nuevo Aditivo/Potenciador</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="additiveName">Nombre:*</label>
          <input id="additiveName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="additiveType">Tipo:</label>
          <input id="additiveType" type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div>
          <label htmlFor="additiveDescription">Descripción:</label>
          <textarea id="additiveDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="additiveSupplierName">Proveedor:</label>
          <input id="additiveSupplierName" type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="additivePurchaseUnitCost">Costo Unit. Compra:*</label>
          <input id="additivePurchaseUnitCost" type="number" step="0.01" value={purchaseUnitCost} onChange={(e) => setPurchaseUnitCost(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="additivePurchaseUnitVolumeMl">Vol. Unit. Compra (ml):*</label>
          <input id="additivePurchaseUnitVolumeMl" type="number" step="0.01" value={purchaseUnitVolumeMl} onChange={(e) => setPurchaseUnitVolumeMl(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="additiveCostPerApplicationEstimate">Costo Estimado/Aplicación:*</label>
          <input id="additiveCostPerApplicationEstimate" type="number" step="0.01" value={costPerApplicationEstimate} onChange={(e) => setCostPerApplicationEstimate(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="additiveStockNotes">Notas de Stock:</label>
          <textarea id="additiveStockNotes" value={stockNotes} onChange={(e) => setStockNotes(e.target.value)} />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Añadiendo...' : 'Añadir Aditivo'}
        </button>
      </form>
    </div>
  );
}

export default AddAdditiveForm; 