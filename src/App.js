import React, { useState } from 'react';
import Sidebar from './components/menu/Sidebar';
import MapComponent from './components/mapa/MapComponent';
import { estacionesConvencionales } from './components/menu/hidrologia/estConvencionales'; // Asegúrate de tener los datos correctos

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mostrarMarcadores, setMostrarMarcadores] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEstConvencionalesClick = (isOpen) => {
    setMostrarMarcadores(isOpen);
  };

  return (
    <div>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onEstConvencionalesClick={handleEstConvencionalesClick}
      />
      <MapComponent
        mostrarMarcadores={mostrarMarcadores}
        estaciones={estacionesConvencionales}
      />
    </div>
  );
};

export default App;
