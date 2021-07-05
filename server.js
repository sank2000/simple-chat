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
});
