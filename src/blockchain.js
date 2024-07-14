const express = require('express');
const axios = require('axios');
const router = express.Router();

const PYTHON_SERVER_URL = 'http://localhost:5000';

// Importa tu cliente Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ruta para obtener la cadena de bloques
router.get('/chain', async (req, res) => {
    try {
        const response = await axios.get(`${PYTHON_SERVER_URL}/chain`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Ruta para agregar un bloque nuevo
router.post('/add_block', async (req, res) => {
    try {
        const { patientId, name, diagnosis } = req.body;

        // Crea una cita médica usando Prisma
        const appointment = await prisma.appointment.create({
            data: {
                patientId,
                name,
                diagnosis,
            },
        });

        // Envía los datos al blockchain
        const response = await axios.post(`${PYTHON_SERVER_URL}/add_block`, {
            data: appointment,
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Ruta para validar la cadena
router.get('/validate_chain', async (req, res) => {
    try {
        const response = await axios.get(`${PYTHON_SERVER_URL}/validate_chain`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
