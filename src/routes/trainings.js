const express = require('express');
const TrainingResult = require('../models/TrainingResult');

const router = express.Router();

// Récupérer l'historique d'entraînement de l'utilisateur connecté
router.get('/', async (req, res) => {
  try {
    const results = await TrainingResult.find({ userId: req.user.userId }).sort({ date: 1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'historique d\'entraînement' });
  }
});

// Enregistrer un nouveau résultat d'entraînement pour l'utilisateur connecté
router.post('/', async (req, res) => {
  try {
    const { card, userAnswerLabel, isCorrect } = req.body;

    const newResult = new TrainingResult({
      userId: req.user.userId,
      card,
      userAnswerLabel,
      isCorrect,
      date: new Date()
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    console.error('Save training error:', error);
    res.status(400).json({ error: 'Impossible de sauvegarder le résultat d\'entraînement' });
  }
});

module.exports = router;
