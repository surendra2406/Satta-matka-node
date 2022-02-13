const User = require('../../models/Admin');
const crypto = require('crypto');
const secret = 'sattamatka';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const formidable = require('formidable');

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

exports.index = (req,res) => {
    const data = {type:1,fileName:'a'}
    res.render('admin_layout/index',{title:"Admin Login",data:data})
}

exports.adminLoginCheck = (req,res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
       
        var username = fields.username
        var password = fields.password
        /* 
        bcrypt.genSalt(10, function (err, Salt) {
            bcrypt.hash(password, Salt, async function (err, hash) {
                if (err) {
                    return console.log('Cannot encrypt');
                }
                console.log('Encrypted password is: ', password);
                console.log('Decrypted password is: ', hash);
                var hashpassword = hash;

                const newAdmin = new User({
                    username: username,
                    password: hashpassword,
                    is_admin: true
                });
            
                try {
                    const user = await newAdmin.save();
                    return true
                } catch (err) {
                    return false
                }
        

            })
        })

        return true */
        
        
        User.findOne({
            'username':username,'status':true,'is_admin':true
        }).exec(function (err, userInfo) {
            if (err) {
                console.log();
                return res.redirect(admin);
            } else {
                console.log(userInfo);     
                if (userInfo) {
                    bcrypt.compare(password, userInfo.password, 
                        async function (err, isMatch) {
                        // Comparing the original password to encrypted password   
                        if (isMatch) {
                            console.log(userInfo._id);
                            console.log(userInfo.admin_type);
                            let admin_type = userInfo.admin_type
                            const token = jwt.sign(
                                {   user_id: userInfo._id},
                                    process.env.SECRET_KEY,
                                {
                                expiresIn: "1d",
                            })
                            
                            localStorage.setItem('dXNlcg==', token);

                           /*  const decoded = jwt.verify(token, process.env.SECRET_KEY)
                            console.log(decoded.user_id) */

                           /* const sessionData = req.session
                            sessionData.adminData = userInfo
                            console.log("Successfully Login"); */
                            return res.send({status:"success",msg:"Login successfully.....Redirecting...."});
                        }
                
                        if (!isMatch) {
                            console.log("Invalid Login Details");
                            return res.send({status:"error",msg:"Invalid Login Details..!!!"});
                        }
                    })
                } else {
                    console.log("No Data Found");
                    return res.send({status:"error",msg:"No Data Found"});
                }
            }
        });
    });
    
    /* const newUser = new User({
        username: username,
        password: hash,
        is_admin: true
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    } */
    
    

   /*  const user = await User.findOne({ username:username });
    return res.status(200).json({msg:user}); */
}

exports.logout = (req,res) =>{
    // res.clearCookie("user_sid");
    localStorage.removeItem('dXNlcg==');
    return res.redirect(admin);
}

exports.forgotPws = async (req,res) =>
{
    const user = await User.findOne({ username:'admin'});
    if(user){
        var email = user.email;
        let first=3; let last=-5; let rep='**************';

        let begin  = email.substr(0,first);
        let end    = email.substr(last);
        let staremail  = begin+rep+end;

        const data = {type:1,fileName:'c'}
        res.render('admin_layout/index',{title:"Forgot Password",staremail:staremail,data:data})
    }
}

exports.checkEmail = (req,res) =>{
    var email = req.body.email
    
    User.findOne({
        'username': 'admin','email':email,'status':true,'is_admin':true
    }).exec(function (err, userInfo) {
        if (err) {
            console.log();
            return res.redirect(admin);
        } else {
            if (userInfo) {
                return res.send(true)
            }else{
                return res.send(false)
            }
        }
    });
}
exports.forgotPassword = (req,res)=>{
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        var forgot_pass_verify_code = '';
        var length = 50;
        var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            forgot_pass_verify_code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        var minutesToAdd=15;
        var currentDate = new Date();
        var for_pass_expiry_time = new Date(currentDate.getTime() + minutesToAdd*60000);
       
        var email = fields.email
        console.log(for_pass_expiry_time);
        /* 
        Send Email Link Is Pending.. Write Your Code Here 
        
        
        */

        let data = await User.updateOne({ 
                username: "admin" 
            }, {
                $set: { 
                    'pass_verify_code': forgot_pass_verify_code,
                    'pass_expiry_time':for_pass_expiry_time,
                    'for_pass_status':0
                }
            }
        );
        return res.send({status:"success",msg:"Recover Password Link successfully sent to your email. Please check your Inbox/ Spam/Junk Emails."});

    });
}

exports.recoverPassword = async (req,res) =>{
    var token = req.params.token

    console.log(token);
    var users = await User.findOne({'pass_verify_code':token}).exec();

    if(users){
        let email = users.email
        let for_pass_status = users.for_pass_status
        let for_pass_expiry_time = users.pass_expiry_time

        let nowtime = new Date();
        let flag_status = '';
        let msg = '';
        
        if(nowtime > for_pass_expiry_time){
            flag_status = 1;
            msg = "Your Password verification Link is expired now.";
        }else if(for_pass_status == 1 ){
            flag_status = 1;
            msg = "Password already updated by using this link.";
        }else {
            flag_status = 2;
            email = email;
        }

        const data = {type:1,fileName:'d'}
        res.render('admin_layout/index',{title:"Update Password",email:email,flag_status:flag_status,msg:msg,data:data})
    }else{
        return res.redirect(admin);
    }  
}

exports.submitResetPassword = (req,res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
      
        var password = fields.new_password
        var confirm_password = fields.confirm_password
        
        bcrypt.genSalt(10, function (err, Salt) {
            bcrypt.hash(password, Salt, async function (err, hash) {
                if (err) {
                    return console.log('Cannot encrypt');
                }
                
                let data = await User.updateOne(
                    { username: 'admin' },
                    {
                        $set: { 
                            'password': hash,
                            'for_pass_status': 1
                        }
                    }
                );
                return res.send({status:"success",msg:"Password Succesfully Changed.."});
            })
        })
    });
}

exports.changePassword = (req,res) =>{
    const data = {type:2,fileName:'f'}
    res.render('admin_layout/index',{title:"Change Password",data:data})
}

exports.checkOldPassword = async (req,res) =>{
    var old_password = req.body.old_password
    var token;

    if(localStorage.getItem('dXNlcg==') != null){
        token = localStorage.getItem('dXNlcg==')
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded.user_id);

    /* bcrypt.genSalt(10, function (err, Salt) {
        bcrypt.hash(old_password, Salt, async function (err, hash) {
            if (err) {
                return console.log('Cannot encrypt');
            }
            console.log('Encrypted password is: ', old_password);
            console.log('Decrypted password is: ', hash);
           
        })
    })
 */
    User.findOne({
        '_id': decoded.user_id,'status':true,'is_admin':true
    }).exec(function (err, userInfo) {
        if (err) {
            console.log();
            return res.redirect(admin);
        } else {
            if (userInfo) {
                bcrypt.compare(old_password, userInfo.password, 
                    async function (err, isMatch) {
                    if (isMatch) {
                        return res.send(true)
                    }
            
                    if (!isMatch) {
                        return res.send(false)
                    }
                })
            }
        }
    });
}

exports.updateUserPassword = (req,res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
       
        var old_password = fields.old_password
        var password = fields.new_password
        var confirm_password = fields.confirm_password
        var token;

        if(localStorage.getItem('dXNlcg==') != null){
            token = localStorage.getItem('dXNlcg==')
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded.user_id);

        bcrypt.genSalt(10, function (err, Salt) {
            bcrypt.hash(password, Salt, async function (err, hash) {
                if (err) {
                    return console.log('Cannot encrypt');
                }
                
                let data = await User.updateOne(
                    { _id: decoded.user_id },
                    {
                        $set: { 
                            password: hash
                        }
                    }
                );
                return res.send({status:"update",msg:"Password updated succesfully.."});
            })
        })
    });
}
