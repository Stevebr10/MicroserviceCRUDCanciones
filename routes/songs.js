const express = require('express');
const { body } = require('express-validator');
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong
} = require('../controllers/songController');

const router = express.Router();

// Validaciones para crear/actualizar canciones
const songValidation = [
  body('name')
    .notEmpty()
    .withMessage('El nombre de la canción es requerido')
    .trim()
    .isLength({ max: 200 })
    .withMessage('El nombre no puede exceder 200 caracteres'),
  body('path')
    .notEmpty()
    .withMessage('La ruta/URL de la canción es requerida')
    .trim(),
  body('plays')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Las reproducciones deben ser un número entero no negativo')
];

// Rutas CRUD
router.get('/', getAllSongs);                    // GET /api/songs
router.get('/:id', getSongById);                 // GET /api/songs/:id  
router.post('/', songValidation, createSong);   // POST /api/songs
router.put('/:id', songValidation, updateSong); // PUT /api/songs/:id
router.delete('/:id', deleteSong);              // DELETE /api/songs/:id

module.exports = router;