const Song = require('../models/Song');
const { validationResult } = require('express-validator');

// GET - Obtener todas las canciones
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las canciones',
      error: error.message
    });
  }
};

// GET - Obtener una canción por ID
const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Canción no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: song
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la canción',
      error: error.message
    });
  }
};

// POST - Crear una nueva canción
const createSong = async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { name, path, plays } = req.body;
    
    const song = new Song({
      name,
      path,
      plays: plays || 0
    });

    const savedSong = await song.save();
    
    res.status(201).json({
      success: true,
      message: 'Canción creada exitosamente',
      data: savedSong
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la canción',
      error: error.message
    });
  }
};

// PUT - Actualizar una canción
const updateSong = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const song = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, // Retorna el documento actualizado
        runValidators: true // Ejecuta las validaciones del schema
      }
    );

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Canción no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Canción actualizada exitosamente',
      data: song
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la canción',
      error: error.message
    });
  }
};

// DELETE - Eliminar una canción
const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Canción no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Canción eliminada exitosamente',
      data: song
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la canción',
      error: error.message
    });
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong
};