// Import dependencias
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Divided the server to support HTTP and WEB SOCKET
// Communication in Real Time
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Connection with MongoDB
mongoose.connect('mongodb+srv://instagram:instagram@cluster0-jqh2a.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

//Send all the information to all rotes
app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());

app.use('/file', express.static(path.resolve(__dirname, '..', 'upload', 'resized')));

app.use(require('./routes'));

server.listen(3333);