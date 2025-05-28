import React, { useState } from 'react';

function AddFinishedProductForm({ onFinishedProductAdded }) {
  const [name, setName] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [sizeMlG, setSizeMlG] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
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

    const productData = {
      name,
      product_type: productType,
      description: description.trim() === '' ? null : description,
      size_ml_g: sizeMlG.trim() === '' ? null : sizeMlG,
      supplier_name: supplierName.trim() === '' ? null : supplierName,
      cost_price: parseFloat(costPrice),
      sale_price: parseFloat(salePrice),
      stock_units: parseInt(stockUnits, 10) || 0,
      min_stock_units: minStockUnits.trim() === '' ? null : parseInt(minStockUnits, 10),
    };

    try {
      const response = await fetch('http://localhost:8000/inventory/finished-products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data from backend:', errorData);
        let errorMessage = `HTTP error! status: ${response.status}`;
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map(err => `${err.loc ? err.loc.join(' -> ') + ': ': ''}${err.msg}`).join('; ');
          } else {
            errorMessage = errorData.detail;
          }
        }
        throw new Error(errorMessage);
      }
      
      setSuccessMessage('¡Producto terminado añadido con éxito!');
      // Clear form
      setName('');
      setProductType('');
      setDescription('');
      setSizeMlG('');
      setSupplierName('');
      setCostPrice('');
      setSalePrice('');
      setStockUnits('0');
      setMinStockUnits('0');

      if (onFinishedProductAdded) {
        onFinishedProductAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Añadir Nuevo Producto Terminado</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Nombre:*</label>
          <input id="productName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="productType">Tipo de Producto:*</label>
          <input id="productType" type="text" value={productType} onChange={(e) => setProductType(e.target.value)} placeholder="Ej: Perfume, Crema" required />
        </div>
        <div>
          <label htmlFor="costPrice">Costo:*</label>
          <input id="costPrice" type="number" step="0.01" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="salePrice">Precio de Venta:*</label>
          <input id="salePrice" type="number" step="0.01" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} required />
        </div>        
        <div>
          <label htmlFor="productDescription">Descripción:</label>
          <textarea id="productDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="sizeMlG">Tamaño (ml/g):</label>
          <input id="sizeMlG" type="text" value={sizeMlG} onChange={(e) => setSizeMlG(e.target.value)} placeholder="Ej: 100ml, 50g"/>
        </div>
        <div>
          <label htmlFor="supplierName">Proveedor:</label>
          <input id="supplierName" type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} placeholder="Ej: In-house, Proveedor Externo" />
        </div>
        <div>
          <label htmlFor="stockUnits">Stock (unidades):</label>
          <input id="stockUnits" type="number" min="0" value={stockUnits} onChange={(e) => setStockUnits(e.target.value)} />
        </div>
        <div>
          <label htmlFor="minStockUnits">Stock Mínimo (unidades):</label>
          <input id="minStockUnits" type="number" min="0" value={minStockUnits} onChange={(e) => setMinStockUnits(e.target.value)} />
        </div>
        <button type="submit" disabled={isLoading} style={{ marginTop: '1em' }}>
          {isLoading ? 'Añadiendo...' : 'Añadir Producto Terminado'}
        </button>
      </form>
    </div>
  );
}

export default AddFinishedProductForm; 