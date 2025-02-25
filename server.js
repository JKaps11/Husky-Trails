/*
const express = require('express');
const MBTiles = require('mbtiles');
const fs = require('fs');

const app = express();
const port = 8080;

// Define the path to your MBTiles file.
// Ensure this file is bundled with your app. You may need to adjust the path based on your setup.
const mbtilesPath = './maps/mbtiles';

// Optionally, serve a minimal style JSON at /style.json.
const style = {
  version: 8,
  name: 'UConn Campus',
  sources: {
    uconn: {
      type: 'vector',
      tiles: [`http://localhost:${port}/{z}/{x}/{y}.pbf`],
      minzoom: 14,
      maxzoom: 20,
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': '#fff' },
    },
    {
      id: 'uconn-layer',
      type: 'fill',
      source: 'uconn',
      'source-layer': 'your_source_layer_name', // Replace with your MBTiles layer name.
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.8,
      },
    },
  ],
};

// Serve the style JSON at /style.json.
app.get('/style.json', (req, res) => {
  res.json(style);
});

// Open the MBTiles file.
new MBTiles(mbtilesPath, (err, mbtiles) => {
  if (err) {
    console.error('Error opening MBTiles:', err);
    return;
  }

  // Define a route to serve vector tiles.
  app.get('/:z/:x/:y.pbf', (req, res) => {
    const z = parseInt(req.params.z, 10);
    const x = parseInt(req.params.x, 10);
    // Convert from XYZ to TMS by flipping y:
    const y = Math.pow(2, z) - 1 - parseInt(req.params.y, 10);

    mbtiles.getTile(z, x, y, (err, tile, headers) => {
      if (err) {
        res.status(404).send('Tile not found');
      } else {
        res.set({
          'Content-Type': 'application/x-protobuf',
          'Content-Encoding': 'gzip',
        });
        res.send(tile);
      }
    });
  });

  // Start the server.
  app.listen(port, () => {
    console.log(`Tile server running on http://localhost:${port}`);
  });
});
*/