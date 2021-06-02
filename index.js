const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }});

let valueCard = 'O';

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  socket.on('card', ({ index }) => {
    console.log('card é ' + index);
    
    if (valueCard === 'X') {
      valueCard = 'O';
    } else {
      valueCard = 'X';
    }

    io.emit('cardGlobal', { id: index, value: valueCard });
  });
});

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3001, () => {
  console.log('Servidor ouvindo na porta 3001');
});