const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    titre: {
      type: String,
      required: true
    },
    difficulte: {
      type: String,
      enum: ['facile', 'moyen', 'difficile'],
      required: true
    },
    contexte: {
      type: String,
      required: true
    },
    commandes: {
      type: String,
      required: true
    },
    logs: {
      type: String,
      required: true
    },
    indices: [
      {
        type: String,
        required: true
      }
    ],
    reponse: {
      type: String,
      enum: ['true_positive', 'false_positive', 'benign'],
      required: true
    },
    explication: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Alert', AlertSchema, 'alerts');

