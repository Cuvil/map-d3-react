import React, { useEffect } from 'react';
import L from 'leaflet';
import * as d3 from 'd3';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css'

const MapComponent = () => {
  useEffect(() => {
    // Verificar si el contenedor del mapa ya está inicializado
    const container = L.DomUtil.get('map-container');
    if (container._leaflet_id != null) {
      container._leaflet_id = null; // Resetear el contenedor del mapa
    }

    

    // Coordenadas y nivel de zoom iniciales
    const initialCoordinates = [-5.149, -74.136]; // Coordenadas [latitud, longitud]
    const initialZoomLevel = 7.4;

    // Crear el mapa usando Leaflet y establecer la vista inicial
    const map = L.map('map-container').setView(initialCoordinates, initialZoomLevel);

    // Agregar una capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crear datos de ejemplo para el mapa
    const data = [
      { name: 'A', value: 10, coords: [51.505, -0.09] },
      { name: 'B', value: 20, coords: [48.8566, 2.3522] },
      { name: 'C', value: 30, coords: [40.7128, -74.0060] }
    ];

    // Crear un contenedor SVG sobre el mapa de Leaflet
    const svg = d3.select(map.getPanes().overlayPane).append('svg');
    const g = svg.append('g').attr('class', 'leaflet-zoom-hide');

    // Función para proyectar los puntos de datos al sistema de coordenadas del mapa
    function projectPoint(lat, lng) {
      const point = map.latLngToLayerPoint(new L.LatLng(lat, lng));
      return [point.x, point.y];
    }

    // Crear una escala lineal para asignar valores a tamaños de círculo
    const scale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.value)])
                    .range([5, 50]); // Tamaño mínimo y máximo del círculo

    // Agregar círculos al contenedor del mapa
    const circles = g.selectAll('circle')
                      .data(data)
                      .enter()
                      .append('circle')
                      .attr('cx', d => projectPoint(d.coords[0], d.coords[1])[0])
                      .attr('cy', d => projectPoint(d.coords[0], d.coords[1])[1])
                      .attr('r', d => scale(d.value))
                      .attr('fill', 'steelblue')
                      .attr('opacity', 0.6);

    // Función para actualizar la posición de los círculos al cambiar el zoom o mover el mapa
    function update() {
      circles.attr('cx', d => projectPoint(d.coords[0], d.coords[1])[0])
             .attr('cy', d => projectPoint(d.coords[0], d.coords[1])[1]);
    }

    map.on('zoomend', update);
    map.on('moveend', update);
    update(); // Llamar a update una vez para posicionar los círculos inicialmente

  }, []); // Ejecutar solo una vez al cargar el componente

  return (
    <div id="map-container" style={{ width: '100%', height: '100vh' }}>
      {/* Contenedor para el mapa */}
    </div>
  );
};

export default MapComponent;
