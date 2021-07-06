const socket = io('http://localhost:8080');

socket.on('messageFromServer', (dataFromServer) => {
  socket.emit('dataToServer', { data: 'Data from the Client!' });
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const newMessage = document.querySelector('#user-message').value;
  socket.emit('newMessageToServer', { text: newMessage });
});

socket.on('messageToClients', (msg) => {
  console.log(msg);
  document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
});

// socket.on('ping', () => {
//   console.log('Ping was recieved from the server.');
//   console.log(io.protocol);
// });

// socket.on('pong', (latency) => {
//   console.log(latency);
//   console.log('Pong was sent to the server.');
// });
