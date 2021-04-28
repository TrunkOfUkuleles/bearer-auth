'use strict';

const mongoose = require('mongoose');
const server = require('./src/server.js')
const options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  };

  require('dotenv').config()

  mongoose.connect(process.env.MONGODB_URI, options)
  .then(() =>{
    console.log("Connected MONGO start")
    server.start(process.env.PORT);
  })
  .catch(e => console.error('Could not start server', e.message));

  