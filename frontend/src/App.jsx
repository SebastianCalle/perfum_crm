import React, { useState, useEffect, useCallback } from 'react';
import {
  Routes,
  Route,
  // Link // Consider using Link for navigation later
} from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'; // Importar HomePage
import InventoryDashboard from './components/inventory/InventoryDashboard';
import AddFragrancePage from './components/inventory/Fragrance/AddFragrancePage';
import AddBottlePage from './components/inventory/Bottle/AddBottlePage';
import AddAlcoholPage from './components/inventory/Alcohol/AddAlcoholPage';
import AddAdditivePage from './components/inventory/Additive/AddAdditivePage';
import AddHumidifierPage from './components/inventory/Humidifier/AddHumidifierPage';
import AddHumidifierEssencePage from './components/inventory/HumidifierEssence/AddHumidifierEssencePage';
import AddFinishedProductPage from './components/inventory/FinishedProduct/AddFinishedProductPage';
// Importa otros componentes de página aquí cuando los necesites

function App() {
  // Estado para Fragancias
  const [fragrances, setFragrances] = useState([]);
  const [isLoadingFragrances, setIsLoadingFragrances] = useState(true);
  const [errorFragrances, setErrorFragrances] = useState(null);

  // Estado para Botellas
  const [bottles, setBottles] = useState([]);
  const [isLoadingBottles, setIsLoadingBottles] = useState(true);
  const [errorBottles, setErrorBottles] = useState(null);

  // Estado para Alcohol
  const [alcohols, setAlcohols] = useState([]);
  const [isLoadingAlcohols, setIsLoadingAlcohols] = useState(true);
  const [errorAlcohols, setErrorAlcohols] = useState(null);

  // Estado para Aditivos
  const [additives, setAdditives] = useState([]);
  const [isLoadingAdditives, setIsLoadingAdditives] = useState(true);
  const [errorAdditives, setErrorAdditives] = useState(null);

  // Estado para Humidificadores
  const [humidifiers, setHumidifiers] = useState([]);
  const [isLoadingHumidifiers, setIsLoadingHumidifiers] = useState(true);
  const [errorHumidifiers, setErrorHumidifiers] = useState(null);

  // Estado para Esencias de Humidificador
  const [humidifierEssences, setHumidifierEssences] = useState([]);
  const [isLoadingHumidifierEssences, setIsLoadingHumidifierEssences] = useState(true);
  const [errorHumidifierEssences, setErrorHumidifierEssences] = useState(null);

  // Estado para Productos Terminados
  const [finishedProducts, setFinishedProducts] = useState([]);
  const [isLoadingFinishedProducts, setIsLoadingFinishedProducts] = useState(true);
  const [errorFinishedProducts, setErrorFinishedProducts] = useState(null);

  // Fetch Fragancias
  const fetchFragrances = useCallback(async () => {
    setIsLoadingFragrances(true);
    setErrorFragrances(null);
    try {
      const response = await fetch('http://localhost:8000/inventory/fragrances/');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setFragrances(data);
    } catch (err) {
      setErrorFragrances(err.message);
      setFragrances([]);
    } finally {
      setIsLoadingFragrances(false);
    }
  }, []);

  // Fetch Botellas
  const fetchBottles = useCallback(async () => {
    setIsLoadingBottles(true);
    setErrorBottles(null);
    try {
      const response = await fetch('http://localhost:8000/inventory/bottles/'); // Endpoint para botellas
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setBottles(data);
    } catch (err) {
      setErrorBottles(err.message);
      setBottles([]);
    } finally {
      setIsLoadingBottles(false);
    }
  }, []);

  // Fetch Alcohol
  const fetchAlcohols = useCallback(async () => {
    setIsLoadingAlcohols(true);
    setErrorAlcohols(null);
    try {
      const response = await fetch('http://localhost:8000/inventory/alcohols/'); // Endpoint para alcoholes
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAlcohols(data);
    } catch (err) {
      setErrorAlcohols(err.message);
      setAlcohols([]);
    } finally {
      setIsLoadingAlcohols(false);
    }
  }, []);

  // Fetch Aditivos
  const fetchAdditives = useCallback(async () => {
    setIsLoadingAdditives(true);
    setErrorAdditives(null);
    try {
      const res = await fetch('http://localhost:8000/inventory/additives/');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setAdditives(data);
    } catch (err) {
      setErrorAdditives(err.message);
      setAdditives([]);
    } finally {
      setIsLoadingAdditives(false);
    }
  }, []);

  // Fetch Humidificadores
  const fetchHumidifiers = useCallback(async () => {
    setIsLoadingHumidifiers(true);
    setErrorHumidifiers(null);
    try {
      const res = await fetch('http://localhost:8000/inventory/humidifiers/');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setHumidifiers(data);
    } catch (err) {
      setErrorHumidifiers(err.message);
      setHumidifiers([]);
    } finally {
      setIsLoadingHumidifiers(false);
    }
  }, []);

  // Fetch Esencias de Humidificador
  const fetchHumidifierEssences = useCallback(async () => {
    setIsLoadingHumidifierEssences(true);
    setErrorHumidifierEssences(null);
    try {
      const res = await fetch('http://localhost:8000/inventory/humidifier-essences/'); // Ajusta el endpoint si es necesario
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setHumidifierEssences(data);
    } catch (err) {
      setErrorHumidifierEssences(err.message);
      setHumidifierEssences([]);
    } finally {
      setIsLoadingHumidifierEssences(false);
    }
  }, []);

  // Fetch Productos Terminados
  const fetchFinishedProducts = useCallback(async () => {
    setIsLoadingFinishedProducts(true);
    setErrorFinishedProducts(null);
    try {
      const res = await fetch('http://localhost:8000/inventory/finished-products/');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setFinishedProducts(data);
    } catch (err) {
      setErrorFinishedProducts(err.message);
      setFinishedProducts([]);
    } finally {
      setIsLoadingFinishedProducts(false);
    }
  }, []);

  useEffect(() => {
    fetchFragrances();
    fetchBottles();
    fetchAlcohols();
    fetchAdditives();
    fetchHumidifiers();
    fetchHumidifierEssences();
    fetchFinishedProducts();
  }, [fetchFragrances, fetchBottles, fetchAlcohols, fetchAdditives, fetchHumidifiers, fetchHumidifierEssences, fetchFinishedProducts]);

  const handleFragranceAdded = () => {
    fetchFragrances();
  };

  const handleBottleAdded = () => {
    fetchBottles();
  };

  const handleAlcoholAdded = () => {
    fetchAlcohols();
  };

  const handleAdditiveAdded = () => {
    fetchAdditives();
  };

  const handleHumidifierAdded = () => {
    fetchHumidifiers();
  };

  const handleHumidifierEssenceAdded = () => {
    fetchHumidifierEssences();
  };

  const handleFinishedProductAdded = () => {
    fetchFinishedProducts();
  };

  return (
    <div className="App">
      {/* Podrías tener un componente de Layout aquí con Navbar, etc. */}
      <Routes>
        <Route 
          path="/"
          element={<HomePage />}
        />
        <Route 
          path="/inventory"
          element={(
            <InventoryDashboard 
              fragrances={fragrances}
              isLoadingFragrances={isLoadingFragrances}
              errorFragrances={errorFragrances}
              onRefreshFragrances={fetchFragrances}
              bottles={bottles} // Pasar datos de botellas
              isLoadingBottles={isLoadingBottles}
              errorBottles={errorBottles}
              onRefreshBottles={fetchBottles}
              alcohols={alcohols} // Pasar datos de alcoholes
              isLoadingAlcohols={isLoadingAlcohols}
              errorAlcohols={errorAlcohols}
              onRefreshAlcohols={fetchAlcohols}
              additives={additives} // Pasar datos de aditivos
              isLoadingAdditives={isLoadingAdditives}
              errorAdditives={errorAdditives}
              onRefreshAdditives={fetchAdditives}
              humidifiers={humidifiers} // Pasar datos de humidificadores
              isLoadingHumidifiers={isLoadingHumidifiers}
              errorHumidifiers={errorHumidifiers}
              onRefreshHumidifiers={fetchHumidifiers}
              humidifierEssences={humidifierEssences}
              isLoadingHumidifierEssences={isLoadingHumidifierEssences}
              errorHumidifierEssences={errorHumidifierEssences}
              onRefreshHumidifierEssences={fetchHumidifierEssences}
              finishedProducts={finishedProducts}
              isLoadingFinishedProducts={isLoadingFinishedProducts}
              errorFinishedProducts={errorFinishedProducts}
              onRefreshFinishedProducts={fetchFinishedProducts}
            />
          )}
        />
        <Route 
          path="/inventory/fragrances/add"
          element={<AddFragrancePage onFragranceAdded={handleFragranceAdded} />}
        />
        <Route 
          path="/inventory/bottles/add" // Ruta para añadir botellas
          element={<AddBottlePage onBottleAdded={handleBottleAdded} />}
        />
        <Route 
          path="/inventory/alcohols/add" // Ruta para añadir alcohol
          element={<AddAlcoholPage onAlcoholAdded={handleAlcoholAdded} />}
        />
        <Route 
          path="/inventory/additives/add" // Ruta para añadir aditivo
          element={<AddAdditivePage onAdditiveAdded={handleAdditiveAdded} />}
        />
        <Route 
          path="/inventory/humidifiers/add" // Ruta para añadir humidificador
          element={<AddHumidifierPage onHumidifierAdded={handleHumidifierAdded} />}
        />
        <Route 
          path="/inventory/humidifier-essences/add" // Ruta para añadir esencia
          element={<AddHumidifierEssencePage onHumidifierEssenceAdded={handleHumidifierEssenceAdded} />}
        />
        <Route
          path="/inventory/finished-products/add" // Ruta para añadir producto terminado
          element={<AddFinishedProductPage onFinishedProductAdded={handleFinishedProductAdded} />}
        />
        {/* Define otras rutas aquí */}
      </Routes>
    </div>
  );
}

export default App;
