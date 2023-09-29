const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

// Array para almacenar ofertas y pedidos (simplificado)
const trades = [];

// Página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.io para la comunicación en tiempo real
io.on('connection', (socket) => {
    // Enviar lista de trades a los clientes
    socket.emit('updateTrades', trades);

    // Manejar la creación de un nuevo trade
    socket.on('createTrade', (trade) => {
        trades.push(trade);
        io.emit('updateTrades', trades); // Enviar actualización a todos los clientes
    });
});

// Iniciar el servidor en el puerto 3000
http.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
