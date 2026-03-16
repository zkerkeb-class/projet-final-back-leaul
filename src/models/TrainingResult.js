const mongoose = require('mongoose');

const TrainingResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    card: {
      type: Object,
      required: true
    },
    userAnswerLabel: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('TrainingResult', TrainingResultSchema, 'training_results');
