module.exports = {
    tampil(requ, resp) {
        requ.session.loggedid = true
        id = requ.session.userid
        resp.render('dashboard_user.ejs', idUser = {id})
    }
}