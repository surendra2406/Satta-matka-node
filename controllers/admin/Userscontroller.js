exports.usersManagement = (req,res)=>{
    const data = {type:2,fileName:'users/user'}
    res.render('admin_layout/index',{title:"Users Management",data:data})
}