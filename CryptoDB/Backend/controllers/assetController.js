const models = require('../models');
console.log("🔎 Assets model is:", models.Asset);

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await models.Asset.findAll();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};