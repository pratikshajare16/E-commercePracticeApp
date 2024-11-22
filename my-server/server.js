// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = 4000;

// // // Serve the todo.json file
// // app.get('/todo.json', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'todo.json'));
// // });

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
const http = require('http');
const app = require('./App');
const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port);