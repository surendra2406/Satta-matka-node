var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

exports.adminAuth = function(req,res,next){
    if(localStorage.getItem('dXNlcg==') != null){
        var token = localStorage.getItem('dXNlcg==')
        return next();
    }else{
        return res.redirect(admin);
    }

    //const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded.user_id);

    /* if (req.session.adminData) {
        
    }else {
       return res.redirect(admin);
    } */
}
