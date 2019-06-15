const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); // Função que criar um servidor

const server = require('http').Server(app);
// usando o websocket
const io = require('socket.io')(server);

// conectar com o mongodb
mongoose.connect('mongodb+srv://dhemesmongo:script@cluster0-ztfpe.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);
