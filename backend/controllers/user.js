const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.signup = (req,res,next) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save().then(
        () => {
          res.status(201).json({
            message: 'User Added Successflly'
          });
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      )
    }
  )
};

exports.login = (req, res, next) => {
    // console.log('hi login function')
    // res.json('jdnjn')
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
       return res.status(401).json({
          error :new error('user not fpound')
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new error('incorrect password')
            });
          }
            const token = jwt.sign(       
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
          res.status(200).json({
            // frontend expect
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      ).catch(
        (error) => {
          res.body(500).json({
            error: error
          });
        }
      )
    }
  )
}
