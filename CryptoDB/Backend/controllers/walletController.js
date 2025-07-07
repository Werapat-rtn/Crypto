const models = require('../models');
console.log("🔎 Wallet model is:", models.Wallet);

exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await models.Wallet.findAll({
      include: ['User', 'Asset']
    });
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWallet = async (req, res) => {
  try {
    const { user_id, asset_code } = req.body;

    if (!user_id || !asset_code) {
      return res.status(400).json({ error: 'user_id and asset_code are required' });
    }

    const user = await models.User.findByPk(user_id);
    const asset = await models.Asset.findByPk(asset_code);

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    const existing = await models.Wallet.findOne({
      where: { user_id, asset_code }
    });

    if (existing) {
      return res.status(409).json({ error: 'Wallet already exists for this user and asset' });
    }

    const wallet = await models.Wallet.create({
      user_id,
      asset_code,
      balance: 0,
      available_balance: 0,
      frozen_balance: 0
    });

    res.status(201).json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};