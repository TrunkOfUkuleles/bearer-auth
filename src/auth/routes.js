'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js');



authRouter.get('/', ()=>{
    "Proof of Life"
})

authRouter.post('/signup', async (req,res,next) => {
    let newUser = new User(req.body);
    const recorded = await newUser.save();
    const output = {
        user: recorded,
        token: recorded.token
    };
    res.status(201).json(output)
})

authRouter.post('/login', basicAuth, async (req,res,next) => {
    const user = {
        user: req.user,
        token: request.user.token
    }
    res.status(200).json(user)
})

authRouter.get('/users', bearerAuth, async (req,res,next) => {
    const library = await User.find({});
    const userList = library.map(el => el.username);
    res.status(200).json(userList)
})

authRouter.get('/secret', bearerAuth, async (req,res,next) => {
    res.status(200).send("Welcome to the party!")
});

module.exports = authRouter;