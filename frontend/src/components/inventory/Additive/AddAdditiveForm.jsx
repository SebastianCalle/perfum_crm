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
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-primary-200 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-primary-900 mb-2">Añadir Nuevo Aditivo</h3>
        <p className="text-primary-600">Complete los campos para registrar un nuevo aditivo o potenciador en el inventario.</p>
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
            <label htmlFor="additiveName" className="block text-sm font-semibold text-primary-900 mb-2">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              id="additiveName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              placeholder="Ej: Potenciador de fijación"
            />
          </div>

          {/* Tipo */}
          <div>
            <label htmlFor="additiveType" className="block text-sm font-semibold text-primary-900 mb-2">
              Tipo
            </label>
            <input
              id="additiveType"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              placeholder="Ej: Fijador, Antioxidante, Conservante"
            />
          </div>

          {/* Proveedor */}
          <div>
            <label htmlFor="additiveSupplierName" className="block text-sm font-semibold text-primary-900 mb-2">
              Proveedor
            </label>
            <input
              id="additiveSupplierName"
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300"
              placeholder="Ej: Aditivos Químicos SA"
            />
          </div>

          {/* Volumen Unitario */}
          <div>
            <label htmlFor="additivePurchaseUnitVolumeMl" className="block text-sm font-semibold text-primary-900 mb-2">
              Volumen Unitario (ml) <span className="text-red-500">*</span>
            </label>
            <input
              id="additivePurchaseUnitVolumeMl"
              type="number"
              step="0.01"
              value={purchaseUnitVolumeMl}
              onChange={(e) => setPurchaseUnitVolumeMl(e.target.value)}
              required
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
              placeholder="100.00"
            />
          </div>
        </div>

        {/* Descripción - Campo completo */}
        <div>
          <label htmlFor="additiveDescription" className="block text-sm font-semibold text-primary-900 mb-2">
            Descripción
          </label>
          <textarea
            id="additiveDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300 resize-none"
            placeholder="Descripción del aditivo y sus propiedades..."
          />
        </div>

        {/* Grid de campos numéricos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Costo Unitario */}
          <div>
            <label htmlFor="additivePurchaseUnitCost" className="block text-sm font-semibold text-primary-900 mb-2">
              Costo Unitario <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-primary-600 font-medium">$</span>
              <input
                id="additivePurchaseUnitCost"
                type="number"
                step="0.01"
                value={purchaseUnitCost}
                onChange={(e) => setPurchaseUnitCost(e.target.value)}
                required
                className="w-full pl-8 pr-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Costo por Aplicación */}
          <div>
            <label htmlFor="additiveCostPerApplicationEstimate" className="block text-sm font-semibold text-primary-900 mb-2">
              Costo por Aplicación <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-primary-600 font-medium">$</span>
              <input
                id="additiveCostPerApplicationEstimate"
                type="number"
                step="0.01"
                value={costPerApplicationEstimate}
                onChange={(e) => setCostPerApplicationEstimate(e.target.value)}
                required
                className="w-full pl-8 pr-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Notas de Stock */}
          <div>
            <label htmlFor="additiveStockNotes" className="block text-sm font-semibold text-primary-900 mb-2">
              Notas de Stock
            </label>
            <textarea
              id="additiveStockNotes"
              value={stockNotes}
              onChange={(e) => setStockNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors placeholder-primary-300 resize-none"
              placeholder="Notas sobre el stock..."
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
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Añadiendo...
              </div>
            ) : (
              'Añadir Aditivo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAdditiveForm; 