const express = require('express');
const Alert = require('../models/Alert');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ id: 1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des cartes' });
  }
});

router.get('/random', async (req, res) => {
  try {
    const [alert] = await Alert.aggregate([{ $sample: { size: 1 } }]);
    if (!alert) {
      return res.status(404).json({ error: 'Aucune carte disponible' });
    }
    res.json(alert);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération aléatoire' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const numericId = Number(req.params.id);
    const alert = await Alert.findOne({ id: numericId });
    if (!alert) {
      return res.status(404).json({ error: 'Carte non trouvée' });
    }
    res.json(alert);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la carte' });
  }
});

router.post('/', async (req, res) => {
  try {
    const alert = new Alert(req.body);
    const saved = await alert.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

