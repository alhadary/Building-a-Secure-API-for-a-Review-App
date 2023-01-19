const express = require('express');
const router = express.Router();    /////?
const userCntrl = require('../controllers/user');
router.post('/login', userCntrl.login);
router.post('/signup', userCntrl.signup);
module.exports = router;

