const express = require('express')

const loginUserRouter = express.Router()

loginUserRouter.route('/')
    .get()

module.exports = loginUserRouter