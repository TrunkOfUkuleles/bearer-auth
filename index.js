'use strict';

const mongoose = require('mongoose');
const server = require('./src/server.js')
const options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  };
  let MONGO = process.env.MONGODB_URI
  let PORT = process.env.PORT

  require('dotenv').config()

  mongoose.connect(MONGO, options)
  .then(() =>{
    console.log("Connected MONGO start")
    server.start(PORT);
  })
  .catch(e => console.error('Could not start server', e.message));

  