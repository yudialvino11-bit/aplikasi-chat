// index.js

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Memberikan file HTML statis saat diakses
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Menangani koneksi Socket.IO
io.on('connection', (socket) => {
  console.log('Pengguna terhubung');

  // Mendengarkan event 'chat message' dari klien
  socket.on('chat message', (msg) => {
    // Mengirim pesan ke semua klien yang terhubung (broadcast)
    io.emit('chat message', msg);
    console.log('Pesan: ' + msg);
  });

  // Menangani pemutusan koneksi
  socket.on('disconnect', () => {
    console.log('Pengguna terputus');
  });
});

// Jalankan server di port 3000
server.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
