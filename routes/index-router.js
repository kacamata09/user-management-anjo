const express = require('express')

const indexRouter = express.Router()

indexRouter.route('/')
    .get((requ, resp)=> {
        resp.render('dashboard_user.ejs')
    })

module.exports = indexRouter