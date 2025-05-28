import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación
import FragranceList from './Fragrance/FragranceList';
import BottleList from './Bottle/BottleList'; // Importar BottleList
import AlcoholList from './Alcohol/AlcoholList'; // Importar AlcoholList
import AdditiveList from './Additive/AdditiveList'; // Importar AdditiveList
import HumidifierList from './Humidifier/HumidifierList'; // Importar HumidifierList
import HumidifierEssenceList from './HumidifierEssence/HumidifierEssenceList'; // Importar HumidifierEssenceList
import FinishedProductList from './FinishedProduct/FinishedProductList'; // Import FinishedProductList

function InventoryDashboard({ 
  fragrances, isLoadingFragrances, errorFragrances, onRefreshFragrances,
  bottles, isLoadingBottles, errorBottles, onRefreshBottles,
  alcohols, isLoadingAlcohols, errorAlcohols, onRefreshAlcohols,
  additives, isLoadingAdditives, errorAdditives, onRefreshAdditives,
  humidifiers, isLoadingHumidifiers, errorHumidifiers, onRefreshHumidifiers,
  humidifierEssences, isLoadingHumidifierEssences, errorHumidifierEssences, onRefreshHumidifierEssences,
  finishedProducts, isLoadingFinishedProducts, errorFinishedProducts, onRefreshFinishedProducts // Props for FinishedProducts
}) {
  const [activeTab, setActiveTab] = useState('fragrances'); // 'fragrances', 'bottles', 'alcohols', 'additives', 'humidifiers', 'humidifierEssences', 'finishedProducts'

  const getTabClassName = (tabName) => {
    let className = "py-3 px-5 cursor-pointer border-b-2 font-medium text-sm leading-5 focus:outline-none transition-colors duration-150 ease-in-out mr-2";
    if (activeTab === tabName) {
      className += " text-primary-600 border-primary-600";
    } else {
      className += " text-primary-900 hover:text-primary-600 border-transparent hover:border-primary-300";
    }
    return className;
  };

  const buttonStyle = "bg-primary-600 hover:bg-primary-900 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-opacity-75 transition-all duration-150 ease-in-out text-sm";

  return (
    <div className="bg-primary-100 shadow-lg rounded-lg p-6 border border-primary-200" style={{ backgroundColor: '#2A2A2A', borderColor: '#3A3A3A' }}>
      <h1 className="text-3xl font-bold text-primary-900 mb-6" style={{ color: '#F5F5DC' }}>Panel de Inventario</h1>
      
      <div className="border-b border-primary-200 mb-6" style={{ borderColor: '#3A3A3A' }}>
        <nav className="-mb-px flex flex-wrap" aria-label="Tabs">
          <button className={getTabClassName('fragrances')} onClick={() => setActiveTab('fragrances')}>Fragancias</button>
          <button className={getTabClassName('bottles')} onClick={() => setActiveTab('bottles')}>Botellas</button>
          <button className={getTabClassName('alcohols')} onClick={() => setActiveTab('alcohols')}>Alcoholes</button>
          <button className={getTabClassName('additives')} onClick={() => setActiveTab('additives')}>Aditivos</button>
          <button className={getTabClassName('humidifiers')} onClick={() => setActiveTab('humidifiers')}>Humidificadores</button>
          <button className={getTabClassName('humidifierEssences')} onClick={() => setActiveTab('humidifierEssences')}>Esencias Hum.</button>
          <button className={getTabClassName('finishedProducts')} onClick={() => setActiveTab('finishedProducts')}>Productos Terminados</button>
        </nav>
      </div>

      {activeTab === 'fragrances' && (
        <section>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold text-primary-900" style={{ color: '#F5F5DC' }}>Gestión de Fragancias</h2>
            <Link to="/inventory/fragrances/add">
              <button className={buttonStyle}>Añadir Fragancia</button>
            </Link>
          </div>
          <FragranceList fragrances={fragrances} isLoading={isLoadingFragrances} error={errorFragrances} onRetry={onRefreshFragrances} />
        </section>
      )}
      {activeTab === 'bottles' && (
        <section>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold text-primary-900" style={{ color: '#F5F5DC' }}>Gestión de Botellas</h2>
            <Link to="/inventory/bottles/add">
              <button className={buttonStyle}>Añadir Botella</button>
            </Link>
          </div>
          <BottleList bottles={bottles} isLoading={isLoadingBottles} error={errorBottles} onRetry={onRefreshBottles} />
        </section>
      )}
      {activeTab === 'alcohols' && (
        <section>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold text-primary-900" style={{ color: '#F5F5DC' }}>Gestión de Alcoholes</h2>
            <Link to="/inventory/alcohols/add">
              <button className={buttonStyle}>Añadir Alcohol</button>
            </Link>
          </div>
          <AlcoholList alcohols={alcohols} isLoading={isLoadingAlcohols} error={errorAlcohols} onRetry={onRefreshAlcohols} />
        </section>
      )}
      {activeTab === 'additives' && (
        <section>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold text-primary-900" style={{ color: '#F5F5DC' }}>Gestión de Aditivos</h2>
            <Link to="/inventory/additives/add">
              <button className={buttonStyle}>Añadir Aditivo</button>
            </Link>
          </div>
          <AdditiveList additives={additives} isLoading={isLoadingAdditives} error={errorAdditives} onRetry={onRefreshAdditives} />
        </section>
      )}
      {activeTab === 'humidifiers' && (
        <section>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold text-primary-900" style={{ color: '#F5F5DC' }}>Gestión de Humidificadores</h2>
            <Link to="/inventory/humidifiers/add">
              <button className={buttonStyle}>Añadir Humidificador</button>
            </Link>
          </div>
          <HumidifierList humidifiers={humidifiers} isLoading={isLoadingHumidifiers} error={errorHumidifiers} onRetry={onRefreshHumidifiers} />
        </section>
      )}
      {activeTab === 'humidifierEssences' && (
        <section>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold text-primary-900" style={{ color: '#F5F5DC' }}>Gestión de Esencias Hum.</h2>
            <Link to="/inventory/humidifier-essences/add">
              <button className={buttonStyle}>Añadir Esencia Hum.</button>
            </Link>
          </div>
          <HumidifierEssenceList humidifierEssences={humidifierEssences} isLoading={isLoadingHumidifierEssences} error={errorHumidifierEssences} onRetry={onRefreshHumidifierEssences} />
        </section>
      )}
      {activeTab === 'finishedProducts' && (
        <section>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold text-primary-900" style={{ color: '#F5F5DC' }}>Gestión de Productos Terminados</h2>
            <Link to="/inventory/finished-products/add">
              <button className={buttonStyle}>Añadir Producto Terminado</button>
            </Link>
          </div>
          <FinishedProductList finishedProducts={finishedProducts} isLoading={isLoadingFinishedProducts} error={errorFinishedProducts} onRetry={onRefreshFinishedProducts} />
        </section>
      )}
    </div>
  );
}

export default InventoryDashboard; 