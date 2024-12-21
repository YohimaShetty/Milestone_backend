// src/components/RoutesPage.js
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

function RoutesPage() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);

  const busStops = ['Stop A', 'Stop B', 'Stop C', 'Stop D', 'Stop E', 'Stop F'];

  // Function to handle form submission and get the optimal path
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:5000/api/optimal-path', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start, end })
    });

    const data = await response.json();
    setRoute(data.path);
    setDistance(data.distance);
  };

  // Function to generate the PDF for optimal route and distance
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title of the PDF
    doc.text('Optimal Bus Route Information', 20, 10);
    
    // Route and Distance
    if (route.length > 0) {
      doc.text('Optimal Route:', 20, 20);
      doc.text(route.join(' -> '), 20, 30);
      
      doc.text('Total Distance:', 20, 40);
      doc.text(`${distance} km`, 20, 50);
    } else {
      doc.text('No route found. Please select valid start and end points.', 20, 20);
    }

    // Save the PDF
    doc.save('optimal-bus-route.pdf');
  };

  return (
    <div>
      <h1>Find Optimal Bus Route</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Start:
          <select value={start} onChange={(e) => setStart(e.target.value)}>
            <option value="">Select a stop</option>
            {busStops.map((stop) => (
              <option key={stop} value={stop}>{stop}</option>
            ))}
          </select>
        </label>
        
        <label>
          End:
          <select value={end} onChange={(e) => setEnd(e.target.value)}>
            <option value="">Select a stop</option>
            {busStops.map((stop) => (
              <option key={stop} value={stop}>{stop}</option>
            ))}
          </select>
        </label>
        
        <button type="submit">Find Route</button>
      </form>

      {route.length > 0 && (
        <div>
          <h3>Optimal Route: </h3>
          <p>{route.join(' -> ')}</p>
          <p>Total Distance: {distance} km</p>
          
          {/* Button to generate PDF */}
          <button onClick={generatePDF}>Generate PDF</button>
        </div>
      )}
    </div>
  );
}

export default RoutesPage;
