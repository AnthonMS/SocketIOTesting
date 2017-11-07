var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function() {
    console.log("Listening for requests on port 4000");
});

// static files
app.use(express.static('client'));

// Socket setupo
var io = socket(server);

io.on('connection', function(socket){
    console.log('Made socket connection', socket.id);

    // This is gonna listen for messages from clients
    // Listening on that socket, when server recieves the call named 'chat'
    // it will call the function with the data that was send with the call
    socket.on('chat', function(data) {
        // We wanna send this data to all the other clients on the server
        // io.sockets referes too all sockets connected
        io.sockets.emit('chat', data);
    })

    // This will listen for when someone is typing
    // The server will then broadcast if someones typing.
    // broadcast iis different in the way that it only broadcasts the message
    // To all clients but yourself
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

});