// // 
// // server.js
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// // Bus network represented as a graph
// const busStops = ['Stop A', 'Stop B', 'Stop C', 'Stop D', 'Stop E', 'Stop F'];
// const busRoutes = {
//   'Stop A': { 'Stop B': 5, 'Stop C': 10 },
//   'Stop B': { 'Stop A': 5, 'Stop C': 3, 'Stop D': 8 },
//   'Stop C': { 'Stop A': 10, 'Stop B': 3, 'Stop D': 7, 'Stop E': 4 },
//   'Stop D': { 'Stop B': 8, 'Stop C': 7, 'Stop E': 6, 'Stop F': 2 },
//   'Stop E': { 'Stop C': 4, 'Stop D': 6, 'Stop F': 1 },
//   'Stop F': { 'Stop D': 2, 'Stop E': 1 },
// };

// // Dijkstra's Algorithm to find the shortest path
// function dijkstra(start, end) {
//   let distances = {};
//   let previous = {};
//   let nodes = new Set(busStops);

//   // Initialize all distances to Infinity
//   busStops.forEach(stop => {
//     distances[stop] = Infinity;
//     previous[stop] = null;
//   });
//   distances[start] = 0;

//   while (nodes.size > 0) {
//     // Get the node with the smallest distance
//     let closestNode = [...nodes].reduce((minNode, node) => {
//       return distances[node] < distances[minNode] ? node : minNode;
//     });

//     nodes.delete(closestNode);

//     // If we reached the end, we can stop
//     if (closestNode === end) {
//       let path = [];
//       let currentNode = end;
//       while (previous[currentNode]) {
//         path.unshift(currentNode);
//         currentNode = previous[currentNode];
//       }
//       path.unshift(start);
//       return { path, distance: distances[end] };
//     }

//     // Update distances to neighbors
//     for (let neighbor in busRoutes[closestNode]) {
//       let newDist = distances[closestNode] + busRoutes[closestNode][neighbor];
//       if (newDist < distances[neighbor]) {
//         distances[neighbor] = newDist;
//         previous[neighbor] = closestNode;
//       }
//     }
//   }

//   return { path: [], distance: Infinity }; // No path found
// }

// // API to get the optimal path (POST method)
// app.post('/api/optimal-path', (req, res) => {
//   const { start, end } = req.body;
//   const result = dijkstra(start, end);
//   res.json(result);
// });

// // API to get the optimal path (GET method)
// app.get('/api/optimal-path', (req, res) => {
//   const { start, end } = req.query;

//   if (!start || !end) {
//     return res.status(400).json({ error: 'Both "start" and "end" query parameters are required.' });
//   }

//   const result = dijkstra(start, end);
//   res.json(result);
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Bus network represented as a graph
const busStops = ['Stop A', 'Stop B', 'Stop C', 'Stop D', 'Stop E', 'Stop F'];
const busRoutes = {
  'Stop A': { 'Stop B': 5, 'Stop C': 10 },
  'Stop B': { 'Stop A': 5, 'Stop C': 3, 'Stop D': 8 },
  'Stop C': { 'Stop A': 10, 'Stop B': 3, 'Stop D': 7, 'Stop E': 4 },
  'Stop D': { 'Stop B': 8, 'Stop C': 7, 'Stop E': 6, 'Stop F': 2 },
  'Stop E': { 'Stop C': 4, 'Stop D': 6, 'Stop F': 1 },
  'Stop F': { 'Stop D': 2, 'Stop E': 1 },
};

// Dijkstra's Algorithm to find the shortest path
function dijkstra(start, end) {
  let distances = {};
  let previous = {};
  let nodes = new Set(busStops);

  // Initialize all distances to Infinity
  busStops.forEach(stop => {
    distances[stop] = Infinity;
    previous[stop] = null;
  });
  distances[start] = 0;

  while (nodes.size > 0) {
    // Get the node with the smallest distance
    let closestNode = [...nodes].reduce((minNode, node) => {
      return distances[node] < distances[minNode] ? node : minNode;
    });

    nodes.delete(closestNode);

    // If we reached the end, we can stop
    if (closestNode === end) {
      let path = [];
      let currentNode = end;
      while (previous[currentNode]) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
      }
      path.unshift(start);
      return { path, distance: distances[end] };
    }

    // Update distances to neighbors
    for (let neighbor in busRoutes[closestNode]) {
      let newDist = distances[closestNode] + busRoutes[closestNode][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = closestNode;
      }
    }
  }

  return { path: [], distance: Infinity }; // No path found
}

// API to get the optimal path (POST method)
app.post('/api/optimal-path', (req, res) => {
  const { start, end } = req.body;
  const result = dijkstra(start, end);
  res.json(result);
});

// API to get the optimal path (GET method)
app.get('/api/optimal-path', (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: 'Both "start" and "end" query parameters are required.' });
  }

  const result = dijkstra(start, end);
  res.json(result);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
