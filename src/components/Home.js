// src/components/Home.js
import React, { useState, useEffect } from 'react';

function Home() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Simulate fetching bus schedules (you can replace this with real API later)
    setSchedule([
      { route: 'Route 1', busNumber: '123', arrivalTime: '10:00 AM' },
      { route: 'Route 2', busNumber: '456', arrivalTime: '10:30 AM' },
      { route: 'Route 3', busNumber: '789', arrivalTime: '11:00 AM' },
    ]);
  }, []);

  return (
    <div>
      <h1>Mangalore Bus Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Bus Number</th>
            <th>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index}>
              <td>{item.route}</td>
              <td>{item.busNumber}</td>
              <td>{item.arrivalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
