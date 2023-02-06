const Sauce = require('../models/sauce');
const { json } = require('body-parser');
const sauce = require('../models/sauce');
const fs = require('fs');
const { Console } = require('console');
const like = require('../routes/sauce');

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
                console.log("Hello from ike 200");

        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.deleteSauce = (req, res, next) => {
  sauce.findOne({_id: req.params.sauceId}).then(
    (thing) => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        sauce.deleteOne({_id: req.params.sauceId}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};


exports.modifySause = (req, res, next) => {
    let updateSauce
    if (req.file) {
        const url = req.protocol + '://' + req.get('host')
        req.body.sauce = JSON.parse(req.body.sauce)
         updateSauce =  {
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            heat: req.body.sauce.heat,
            imageUrl: url + '/images/' + req.file.filename,
            userId: req.body.sauce.userId,
            mainPepper: req.body.sauce.mainPepper,
            
        };
    
    } else {
         updateSauce = {
           name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            heat: req.body.heat,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId,
            mainPepper: req.body.mainPepper,
            usersLiked:req.body.usersLiked,
            usersDisliked: req.body.usersDisliked,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
        };


       
    }
     Sauce.updateOne({ _id: req.params.sauseId }, updateSauce).then(
            () => {
                res.status(201).json({
                    message: 'sauce updated successfully'
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



////new///////


// exports.like = (req, res, next) => {
//     req.body.sauce = JSON.parse(req.body.sauce)
//         userId: req.body.sauce.userId,

//     let updateSauce;
//     console.log("Hello from ike");
//     console.log(req.body.sauce.userId);
//     console.log(req.body.like);
//     const url = req.protocol + '://' + req.get('host')

    
//     updateSauce = {
//         userId: req.body.sauce.userId,
//         like: req.body.suace.like,
//     };
    
  


       
   
//     Sauce.like({ _id: req.params.sauseId }, updateSauce).then(
//         () => {
//             res.status(201).json({
//                 message: 'sauce updated successfully'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// };


// exports.likeSauce = (req, res, next) => {
//           // req.body.sauce = JSON.parse(req.body.sauce)
  
//   // updateSauce = {
//   //          name: req.body.name,
//   //           manufacturer: req.body.manufacturer,
//   //           description: req.body.description,
//   //           heat: req.body.heat,
//   //           imageUrl: req.body.imageUrl,
//   //           userId: req.body.userId,
//   //           mainPepper: req.body.mainPepper,
//   //           usersLiked:req.body.usersLiked,
//   //           usersDisliked: req.body.usersDisliked,
//   //           likes: req.body.likes,
//   //           dislikes: req.body.dislikes,
//   //       };

//   const liker = req.body.userId;
//   let likeStatus = req.body.like;
//   // usersLiked: req.body.usersLiked,
//   //  const likes = req.body.likes;
//   sauce.findOne({ _id: req.params.sauseId })
//     .then((votedSauce) => {
//       if (likeStatus === 1) {
//         sauce.updateSauce({ _id:req.params.sauseId }, { $push: { usersLiked: liker }, $inc: { likes:1 }})
//           .then(() => res.status(201).json({ message: 'you liked this sauce' }))
//           .catch(error => res.status(400).json({ error }))
//       } else if (likeStatus === -1) {
//         sauce.updateSauce({ _id: req.params.sauseId }, { $inc: { dislikes: 1 }, $push: { usersDisliked: liker }})
//           .then(() => res.status(201).json({ message: 'you disliked this sauce' }))
//           .catch(error => res.status(400).json({ error }))
//       } else if (likeStatus === 0) {
//         if (votedSauce.usersLiked.includes(liker)) {
//           sauce.updateSauce({ _id: req.params.sauseId }, { $inc: { likes:  -1 }, $pull: { usersLiked: liker }})
//             .then(() => res.status(201).json({ message:'you un-liked this sauce' }))
//             .catch(error => res.status(400).json({ error }))
//           } else if (votedSauce.usersDisliked.includes(liker)) {
//             sauce.updateSauce({ _id: req.params.sauseId }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: liker }})
//             .then(() => res.status(201).json({ message:'you un-disliked this sauce' }))
//             .catch(error => res.status(400).json({ error }))
//           }
//       }
//     })
//     .catch(error => res.status(400).json({ error }))
// };
exports.likeSauce = (req, res, next) => {  
  const liker = req.body.userId;
  let likeStatus = req.body.like;
  sauce.findOne({ _id: req.params.id })
    .then((votedSauce) => {  
      if (likeStatus === 1) {
        sauce.updateOne({ _id:req.params.id }, { $push: { usersLiked: liker }, $inc: { likes:1 }})
          .then(() => res.status(201).json({ message: 'you liked this sauce' }))
          .catch(error => res.status(400).json({ error }))
      } else if (likeStatus === -1) {
        sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: liker }})
          .then(() => res.status(201).json({ message: 'you disliked this sauce' }))
          .catch(error => res.status(400).json({ error }))
      } else if (likeStatus === 0) {
        if (votedSauce.usersLiked.includes(liker)) {
          sauce.updateOne({ _id: req.params.id }, { $inc: { likes:  -1 }, $pull: { usersLiked: liker }})
            .then(() => res.status(201).json({ message:'you un-liked this sauce' }))
            .catch(error => res.status(400).json({ error }))
          } else if (votedSauce.usersDisliked.includes(liker)) {
            sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: liker }})
            .then(() => res.status(201).json({ message:'you un-disliked this sauce' }))
            .catch(error => res.status(400).json({ error }))
          }
      }
    })
    .catch(error => res.status(400).json({ error }))
};
