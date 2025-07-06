const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id/wallets', userController.getUserWallets);

module.exports = router;
