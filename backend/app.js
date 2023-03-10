const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user'); 
const sauceRouter = require('./routes/sauce');
 const path = require('path');


const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://maki:7UULHfN2ZQjMxVgZ@cluster0.65kzxhk.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, use, POST, PUT, DELETE, PATCH, OPTIONS');
  // res.header('Access-Control-Allow-Credentials', true);
  // mongoose.set('strictQuery', true);

  next();
});
app.use(bodyParser.json());
  
app.use('/images', express.static(path.join(__dirname,'images')));


app.use('/api/auth', userRouter); 
app.use('/api/sauces', sauceRouter);
module.exports = app; 