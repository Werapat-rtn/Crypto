const models = require('../models');
console.log("🔎 User model is:", models.User);
const bcrypt = require('bcrypt');

exports.getUserWallets = async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.id, {
      include: ['wallets']
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.wallets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll({
      include: ['wallets']
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await models.User.create({
      email,
      password_hash: hashedPassword,
      full_name,
      kyc_status: 'pending',
      is_active: true
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
