module.exports = {
    isLogin(req, res, next){
        if(req.session.loggedin === true){
            next();
            return;
        } else {
            req.session.destroy(function(err) {
                res.redirect('/login')
                // res.send('login dulu bro klik ini <a href="/login">Login<a>')
            })
        }
    },
    isLogout(req, res, next){
        if(req.session.loggedin !== true){
            
            next();
            return;
        }
        res.redirect('/');
    }
};