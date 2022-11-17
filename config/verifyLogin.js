module.exports = {
    isLogin(req, res, next){
        if(req.session.loggedin === true){
            next();
            return;
        } else {
            req.session.destroy(function(err) {
                // res.redirect('/login')
                res.redirect('/oidc/auth?client_id=Xkv3aRBNyjq06XuhYYxpO8g9UGn&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F')
                // res.send('login dulu bro klik ini <a href="/login">Login<a>')
            })
        }
    },
    isLogout(req, res, next){
        if(req.session.loggedin !== true){
            next();
            return;
        }
        // res.redirect('/');
        res.redirect('/oidc/auth?client_id=Xkv3aRBNyjq06XuhYYxpO8g9UGn&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F')
    }
};