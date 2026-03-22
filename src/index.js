const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const alertsRouter = require('./routes/alerts');
const authRouter = require('./routes/auth');
const trainingsRouter = require('./routes/trainings');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(express.json());

const PORT = process.env.PORT || 4001;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/soc-database';

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log(`✅ Connecté à MongoDB : ${MONGODB_URI}`);
  })
  .catch((error) => {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
  });

app.get('/', (req, res) => {
  res.json({ message: 'API SOC en ligne' });
});

app.use('/auth', authRouter);
app.use('/alerts', authMiddleware, alertsRouter);
app.use('/trainings', authMiddleware, trainingsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 API démarrée sur http://localhost:${PORT}`);
});

module.exports = server;

