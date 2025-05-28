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
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-primary-200 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-primary-900 mb-2">Añadir Nuevo Producto Terminado</h3>
        <p className="text-primary-600">Complete los campos para registrar un nuevo producto terminado en el inventario.</p>
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
          {/* Nombre */}
          <div>
            <label htmlFor="productName" className="block text-sm font-semibold text-primary-900 mb-2">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              id="productName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              placeholder="Ej: Perfume Elegance 50ml"
            />
          </div>

          {/* Tipo de Producto */}
          <div>
            <label htmlFor="productType" className="block text-sm font-semibold text-primary-900 mb-2">
              Tipo de Producto <span className="text-red-500">*</span>
            </label>
            <input
              id="productType"
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              placeholder="Ej: Perfume, Crema, Loción"
            />
          </div>

          {/* Tamaño */}
          <div>
            <label htmlFor="sizeMlG" className="block text-sm font-semibold text-primary-900 mb-2">
              Tamaño
            </label>
            <input
              id="sizeMlG"
              type="text"
              value={sizeMlG}
              onChange={(e) => setSizeMlG(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              placeholder="Ej: 100ml, 50g, 250ml"
            />
          </div>

          {/* Proveedor */}
          <div>
            <label htmlFor="supplierName" className="block text-sm font-semibold text-primary-900 mb-2">
              Proveedor
            </label>
            <input
              id="supplierName"
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              placeholder="Ej: In-house, Proveedor Externo"
            />
          </div>
        </div>

        {/* Descripción - Campo completo */}
        <div>
          <label htmlFor="productDescription" className="block text-sm font-semibold text-primary-900 mb-2">
            Descripción
          </label>
          <textarea
            id="productDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300 resize-none"
            placeholder="Descripción del producto terminado..."
          />
        </div>

        {/* Grid de campos de precios y stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Costo */}
          <div>
            <label htmlFor="costPrice" className="block text-sm font-semibold text-primary-900 mb-2">
              Costo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-primary-600 font-medium">$</span>
              <input
                id="costPrice"
                type="number"
                step="0.01"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                required
                className="w-full pl-8 pr-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Precio de Venta */}
          <div>
            <label htmlFor="salePrice" className="block text-sm font-semibold text-primary-900 mb-2">
              Precio de Venta <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-primary-600 font-medium">$</span>
              <input
                id="salePrice"
                type="number"
                step="0.01"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                required
                className="w-full pl-8 pr-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Grid de stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stock */}
          <div>
            <label htmlFor="stockUnits" className="block text-sm font-semibold text-primary-900 mb-2">
              Stock (unidades)
            </label>
            <input
              id="stockUnits"
              type="number"
              min="0"
              value={stockUnits}
              onChange={(e) => setStockUnits(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
              placeholder="0"
            />
          </div>

          {/* Stock Mínimo */}
          <div>
            <label htmlFor="minStockUnits" className="block text-sm font-semibold text-primary-900 mb-2">
              Stock Mínimo (unidades)
            </label>
            <input
              id="minStockUnits"
              type="number"
              min="0"
              value={minStockUnits}
              onChange={(e) => setMinStockUnits(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
              placeholder="0"
            />
          </div>
        </div>

        {/* Botón de envío */}
        <div className="pt-6 border-t border-primary-200">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-auto px-8 py-3 font-semibold rounded-lg transition-all duration-200 ${
              isLoading
                ? 'bg-primary-300 text-primary-600 cursor-not-allowed'
                : 'bg-primary-900 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Añadiendo...
              </div>
            ) : (
              'Añadir Producto Terminado'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFinishedProductForm; 