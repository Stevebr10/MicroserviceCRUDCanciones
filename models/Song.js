const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la canción es requerido'],
    trim: true,
    maxlength: [200, 'El nombre no puede exceder 200 caracteres']
  },
  path: {
    type: String,
    required: [true, 'La ruta/URL de la canción es requerida'],
    trim: true
  },
  plays: {
    type: Number,
    default: 0,
    min: [0, 'Las reproducciones no pueden ser negativas']
  }
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  versionKey: false // Elimina el campo __v
});

// Método para incrementar reproducciones
songSchema.methods.incrementPlays = function() {
  this.plays += 1;
  return this.save();
};

module.exports = mongoose.model('Song', songSchema, 'songs');