exports.settingManagement = (req,res)=>{
    const data = {type:2,fileName:'setting/set'}
    res.render('admin_layout/index',{title:"Settings Management",data:data})
}