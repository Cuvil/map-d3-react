import React from 'react';
import MapComponent from './components/mapa/MapComponent'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mapa con D3.js y Leaflet en React</h1>
      </header>
      <main>
        <MapComponent />
      </main>
    </div>
  );
}

export default App;
