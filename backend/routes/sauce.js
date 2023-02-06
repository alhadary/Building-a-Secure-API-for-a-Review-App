const express = require('express');
const router = express.Router();
const Sauce = require('../models/sauce');
const sauseCtrl =require('../controllers/sauce')
const multer = require('../middleware/multer-config');
const auth =require('../middleware/auth')
const app = express();

router.post('/',auth, multer, sauseCtrl.createSauce);

router.get('/',auth, sauseCtrl.getAllsauce);

router.get('/:sauceId', auth, sauseCtrl.getOnesauce);

router.delete('/:sauceId',sauseCtrl.deleteSauce);


router.put('/:sauseId', auth, multer, sauseCtrl.modifySause);

router.post('/:id/like',auth,sauseCtrl.likeSauce);




module.exports = router;