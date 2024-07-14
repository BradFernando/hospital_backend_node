const express = require('express');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Importa las rutas necesarias (ajusta la ruta según la estructura de tu proyecto)
const blockchainRouter = require('./src/blockchain');

// Usa las rutas
app.use('/api/blockchain', blockchainRouter);

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la página principal!');
});

// Middleware para manejo de errores 404
app.use((req, res, next) => {
    next(createError(404));
});

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
