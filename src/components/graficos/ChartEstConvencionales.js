// src/components/graficos/ChartEstConvencionales.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChartEstConvencionales = ({ weatherData }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (weatherData.length === 0) return;

    // Limpia el gráfico anterior si existe
    d3.select(chartRef.current).select('svg').remove();

    // Configura el nuevo gráfico
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(weatherData.map(d => d.date))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(weatherData, d => d.tempMax)])
      .nice()
      .range([height, 0]);

    svg.append('g')
      .selectAll('rect')
      .data(weatherData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.tempMax))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.tempMax))
      .attr('fill', 'steelblue');

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
  }, [weatherData]);

  return <div ref={chartRef}></div>;
};

export default ChartEstConvencionales;
