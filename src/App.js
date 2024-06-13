import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/menu/Sidebar';
import MapComponent from './components/mapa/MapComponent';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="App">
      <MapComponent/>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}


export default App;