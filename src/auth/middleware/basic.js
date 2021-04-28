
'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');

module.exports = async (req,res,next) => {

    if(!req.headers.authorization) { next("No Headers")}

    let basic = req.headers.authorization.split(" ").pop();
    let [ username , password ] = base64.decode(basic).split(':')


    try {
        req.user = await User.basicAuth(username, password)
        next();
      } catch (e) {
        res.status(403).send('Invalid Login', e.message);
      }

}