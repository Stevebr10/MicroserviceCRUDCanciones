require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Importar rutas
const songRoutes = require('./routes/songs');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🎵 Microservicio de Canciones - API REST',
    version: '1.0.0',
    endpoints: {
      'GET /api/songs': 'Obtener todas las canciones',
      'GET /api/songs/:id': 'Obtener canción por ID',
      'POST /api/songs': 'Crear nueva canción',
      'PUT /api/songs/:id': 'Actualizar canción',
      'DELETE /api/songs/:id': 'Eliminar canción'
    },
    author: 'Brandon'
  });
});

// Rutas de la API
app.use('/api/songs', songRoutes);

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📍 Entorno: ${process.env.NODE_ENV || 'development'}`);
});