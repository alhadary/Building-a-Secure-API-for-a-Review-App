const express = require('express');
const router = express.Router();
const Sauce = require('../models/sauce');
const sauseCtrl =require('../controllers/sauce')
const multer = require('../middleware/multer-config');
const app = express();

router.post('/', multer, sauseCtrl.createSauce);

router.get('/', sauseCtrl.getAllsauce);

router.get('/:sauceId',sauseCtrl.getOnesauce);

module.exports = router;