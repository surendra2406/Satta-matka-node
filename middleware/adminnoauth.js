const jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

exports.adminNoAuth = function(req,res,next){
    if(localStorage.getItem('dXNlcg==') == null){
        var token = localStorage.getItem('dXNlcg==')
        return next();
    }else{
        return res.redirect(admin+'/dashboard');
    }

    //const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded.user_id);

    /* if (req.session.adminData == undefined) {
        return next();
    }else {
       return res.redirect(admin+'/dashboard');
    } */
}