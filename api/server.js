const express = require('express')
const helmet = require("helmet");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const usersRouter = require('../users/users-router')
const authRouter = require('../auth/auth-router')
const authenticate = require('../auth/authenticate-middleware')
const dbConnection = require('../db/connection')
const server = express();

const sessionConfiguration = {
    name: 'monsterCookie', // default valie is 'sid'
    secret: 'One time at band camp', //key for encryption
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false, //send the cookie only over (https) secured connections
        httpOnly: true, // Prevent JS code on client from accessing this cookie
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: 'sessions',
        sidfieldname:'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30 //time until check and remove expired sessions from DB

    }),
}
server.use(session(sessionConfiguration)); // enables session support
server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', authenticate, usersRouter)
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
    res.json({ api: "up" });
});

module.exports = server;