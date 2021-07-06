const express = require('express');
const socketIo = require('socket.io');

const app = express();

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8080, () => {
  console.log('server running at port 8080');
});

const io = socketIo(expressServer);

io.on('connection', (socket) => {
  socket.emit('messageFromServer', { data: 'Welcome to the socketIo server' });

  socket.on('newMessageToServer', (msg) => {
    console.log(msg);
    io.emit('messageToClients', { text: msg.text });
  });

  socket.join('level1');
  socket
    .to('level1')
    .emit('joined', `${socket.id} says I have joined the level 1 room`);
});

io.of('/admin').on('connection', (socket) => {
  console.log('Someone connected to the admin namespace!');
  io.of('/admin').emit('welcome', 'Welcome to the admin channel!');
});
