const models = require('../models');
console.log("🔎 User model is:", models.User);

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
