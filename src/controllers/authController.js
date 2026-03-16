const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà' });
    }

    // Create new user
    user = new User({ email, password });
    await user.save();
    console.log('User created:', user);
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, email: user.email });
  } catch (error) {
    const fs = require('fs');
    const logData = `[${new Date().toISOString()}] Registration error: ${error.message}\nStack: ${error.stack}\nBody: ${JSON.stringify(req.body)}\n\n`;
    fs.appendFileSync('c:/Users/932252817/Documents/ECE/ING4-APP-Cyber/Semestre 2/Technologies Web/Projets/projet-final-back-leaul/debug_auth.log', logData);

    console.error('Registration error details:', error);
    res.status(500).json({
      error: 'Erreur lors de l\'inscription',
      details: error.message,
      stack: error.stack
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Identifiants invalides' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Identifiants invalides' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );

    res.json({ token, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion', details: error.message });
  }
};

module.exports = {
  register,
  login
};
