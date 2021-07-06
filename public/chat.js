const socket = io('http://localhost:8080'); // / namespace
const socketAdmin = io('http://localhost:8080/admin'); // /admin namespace

socket.on('messageFromServer', (dataFromServer) => {
  socket.emit('dataToServer', { data: 'Data from the Client!' });
});

socketAdmin.on('welcome', (msg) => {
  console.log(msg);
});

socket.on('joined', (msg) => {
  console.log(msg);
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
