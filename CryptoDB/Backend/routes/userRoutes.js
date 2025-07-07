const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id/wallets', userController.getUserWallets);
router.post('/', userController.createUser);

module.exports = router;
