// const db = require('../models');
const models = require('../models');
console.log("🔎 User model is:", models.User); // ถ้า undefined → มีปัญหาที่ index.js หรือ User.js

// console.log("🔎 User model is:", models.User);
// const { Users } = db;

exports.getUserWallets = async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.id, {
      include: ['wallets']   // 'wallets' คือ alias ที่กำหนดใน User.associate
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.wallets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
