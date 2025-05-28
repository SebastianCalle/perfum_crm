import React, { useState, useEffect, useCallback } from 'react';
import {
  Routes,
  Route,
  // Link // Consider using Link for navigation later
} from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'; // Importar HomePage
import InventoryDashboard from './components/inventory/InventoryDashboard';
import AddFragrancePage from './components/inventory/AddFragrancePage';
import AddBottlePage from './components/inventory/AddBottlePage'; // Importar AddBottlePage
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

  useEffect(() => {
    fetchFragrances();
    fetchBottles();
  }, [fetchFragrances, fetchBottles]);

  const handleFragranceAdded = () => {
    fetchFragrances();
  };

  const handleBottleAdded = () => {
    fetchBottles();
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
        {/* Define otras rutas aquí */}
      </Routes>
    </div>
  );
}

export default App;
