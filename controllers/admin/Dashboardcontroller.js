const User = require('../../models/Admin');
const crypto = require("crypto");
const formidable = require('formidable');
const bcrypt = require('bcryptjs');

exports.dashboard = (req,res)=>{
    const data = {type:2,fileName:'b'}
    res.render('admin_layout/index',{title:"Dashboard",data:data})
}

exports.subAdminManagement = (req,res)=>{
    const data = {type:2,fileName:'g'}
    res.render('admin_layout/index',{title:"Sub Admin Management",flag_name:"subAdminListTableFlag",data:data})
}

exports.addSubAdmin = async (req,res,next) =>{
    var id = req.params.id
    var name;
    var email;
    var username;
    var password;
    if(id != 0){
        var user = await User.findOne({'_id':id}).exec();
        name = user.name
        email = user.email
        username = user.username
        enc_password = user.password

        var algorithm = "aes-192-cbc"; //algorithm to use
        var password = "Hello darkness";
        const key = crypto.scryptSync(password, 'salt', 24, { N: 1024 }); //create key
        const iv = crypto.scryptSync(password, 'salt', 16, { N: 1024 });

        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        password = decipher.update(enc_password, 'hex', 'utf8') + decipher.final('utf8'); //decrypted text
    }

    res.render('admin/h',{id:id,name:name,email:email,username:username,password:password})
}

exports.checkUniqueUsername = async (req,res) =>{
    console.log(req.body);
    let admin_username = req.body.admin_username
    var user = await User.findOne({'username':admin_username}).exec();
    if(user != null){
        return res.send(false)
    }else{
        return res.send(true)
    }
}

exports.submitSubAdmin = async (req,res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
       
        var algorithm = "aes-192-cbc"; //algorithm to use
        var password = "Hello darkness";
        const key = crypto.scryptSync(password, 'salt', 24, { N: 1024 }); //create key
        console.log(key);
        var text= "this is the text to be encrypted"; //text to be encrypted
        const iv = crypto.scryptSync(password, 'salt', 16, { N: 1024 }); //crypto.randomBytes(16); // generate different ciphertext everytime

       /*  const iv = crypto.scryptSync(password, 'salt', 16, { N: 1024 }); //crypto.randomBytes(16); // generate different ciphertext everytime
        console.log(iv);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        var encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex'); // encrypted text

        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8'); //decrypted text
        console.log(encrypted);
        console.log(decrypted);
 */
        

        var admin_id = fields.admin_id
        var name = fields.admin_name
        var email = fields.admin_email
        var username = fields.admin_username
        var password = fields.password
        var hashpassword;

        /* bcrypt.genSalt(10, function (err, Salt) {
            bcrypt.hash(password, Salt, async function (err, hash) {
                if (err) {
                    console.log('Cannot encrypt');
                    return err
                }
                hashpassword = hash;
            })
        }) */

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        hashpassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex'); // encrypted text

        const newAdmin = new User({
            name: name,
            email: email,
            username: username,
            password: hashpassword,
            admin_type:2,
            is_admin: true
        });
        
        if(admin_id == 0){
            try {
                const user = await newAdmin.save();
                return res.send({status:"success",msg:"Sub Admin Successfully Created."});
            } catch (err) {
                return err
            }
        }else{
            try {
                let data = await User.updateOne(
                    { _id: admin_id },
                    {
                        $set: { 
                            'name': name,
                            'email': email,
                            'username': username,
                            'password': hashpassword,
                        }
                    }
                );
                return res.send({status:"update",msg:"Sub Admin Successfully Updated...."});
            } catch (err) {
                return err
            }
        }
    })
}

exports.subAdminListGridData = (req,res) =>{
    
    var searchStr = req.body.search.value;
    var status = req.params.any
   
    if(req.body.search.value){
       /*  var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{'name': regex},{'username': regex},{'email': regex}] }; */

        searchStr = { 
            $and: [
            {
                $or: [
                    { name: new RegExp((req.body.search.value).trim(), 'i') },
                    { username: new RegExp((req.body.search.value).trim(), 'i') },
                    { email: new RegExp((req.body.search.value).trim(), 'i') },
                ]
            }, {
                $and: [
                    { admin_type: 2 },
                ]
            }] 
        };
       
        /* searchStr = _.assign({
            $and: [
            {
                $or: [
                    { name: new RegExp((req.body.search.value).trim(), 'i') },
                    { username: new RegExp((req.body.search.value).trim(), 'i') },
                    { email: new RegExp((req.body.search.value).trim(), 'i') },
                ]
            }, {
                $and: [
                    { admin_type: 2 },
                ]
            }]
        }); */
    }
    else
    {
        if(status != undefined && status != 'all' ){
            if(status == 1){
                status = true
            }else{
                status = false
            }
            searchStr = {'status': status,'admin_type': 2};
        }else {
            searchStr = {'admin_type': 2};
        }
    }

    console.log(searchStr);

    var recordsTotal = 0;
    var recordsFiltered=0;
    
    User.count(searchStr, function(err, c) {
        recordsTotal=c;
        User.count(searchStr, function(err, c) {
            recordsFiltered=c;
            User.find(searchStr, '_id name username email status created',{'skip': Number( req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
                if (err) {
                    console.log('error while getting results'+err);
                    return;
                }
               
                var resultData = []
                var i=1
                var display_status = '';
                for (const rs in results)  
                {  
                    if(results[rs].status==true){
                        display_status = '<div id="status_show'+results[rs]._id+'"><badge class="badge badge-success">Active</badge></div>';
                    }else{
                        display_status = '<div id="status_show'+results[rs]._id+'"><badge class="badge badge-danger">Inactive</badge></div>';
                    }
                    
                    var nestedData={
                        sr : i,
                        admin_id : results[rs]._id,
                        name : results[rs].name,
                        email : results[rs].email,
                        username : results[rs].username,
                        insert_date : results[rs].created,
                        display_status: display_status,
                        status : results[rs].status
                    }
                    resultData.push(nestedData)
                    i++
                };

                var data = JSON.stringify({
                    "draw": req.body.draw,
                    "recordsFiltered": recordsFiltered,
                    "recordsTotal": recordsTotal,
                    "data": resultData
                });
                res.send(data);
            });
        });
    });

}

exports.subAdminBlockDataFunction = async (req,res) =>{
    console.log(req.body);
    var id = req.body.id
    var change_status_name = req.body.change_status_name

    var Cstatus
    if(change_status_name == 'true'){
        Cstatus = true
        var msg='Active Successfully';
    }else{
        Cstatus = false
        var msg='Inactive Successfully';
    }

    let data = await User.updateOne(
        { _id: id},
        {
            $set: { 
                status: Cstatus
            }
        }
    );
    return res.send({status:"success",msg:msg});  

}