const Sauce = require('../models/sauce');
const { json } = require('body-parser');

exports.createSauce = (req, res, next) => {
    const body = JSON.parse(req.body.sauce);
    console.log(body);
    const url = req.protocol + '://' + req.get('host')
    const sauce = new Sauce({
        name: body.name,
        manufacturer: body.manufacturer,
        description: body.description,
        heat: body.heat,
        imageUrl: url+'/images/'+req.file.filename,
        userId:body.userId,
        mainPepper: body.mainPepper,
        usersLiked: [],
        usersDisliked: [],
        likes: 0,
        dislikes:0,
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'saved successfully'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


exports.getAllsauce = (req, res, next) => {
    Sauce.find().then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


exports.getOnesauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.sauceId
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};