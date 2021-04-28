  
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

let SECRET = process.env.USER_SECRET

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {toJSON: { virtuals: true } } );

userSchema.virtual('token').get(function(){
    let newTokenObj = {username: this.username}
    return jwt.sign(newTokenObj, SECRET);
});

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 5);
})

userSchema.statics.basicAuth = async function (username, password){
    try{
    const user = await this.findOne({username})
    const validation = await bcrypt.compare(password, user.password)
    if (validation){return user}
    throw new Error("user not here")    
    // validation ? user : new Error('user not found')
}catch(e){
    throw new Error("Something is fishy here...")
}
}

userSchema.statics.bearerAuth = async function (token){
    try{
    const parseToken = jwt.verify(token, process.env.SECRET)
    const user = await this.findOne({username: parseToken.username})
    if (user) {return user}
    throw new Error("User Not Found")} catch(e){
    throw new Error(e.message)    
    }
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

