'use strict';

const express = require('express');
const authRoutes = express.Router();

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js');



authRoutes.get('/', ()=>{
    "Proof of Life"
})

authRoutes.post('/signup', async (req,res,next) => {
    let newUser = new User(req.body);
    const recorded = await newUser.save();
    const output = {
        user: recorded,
        token: recorded.token
    };
    res.status(201).json(output)
})

authRoutes.post('/signin', basicAuth, async (req,res,next) => {
    const user = {
        user: req.user,
        token: req.user.token
    }
    res.status(200).json(user)
})

authRoutes.get('/users', bearerAuth, async (req,res,next) => {
    const library = await User.find({});
    const userList = library.map(el => el.username);
    res.status(200).json(userList)
})

authRoutes.get('/secret', bearerAuth, async (req,res,next) => {
    res.status(200).send("Welcome to the party!")
});

module.exports = authRoutes;