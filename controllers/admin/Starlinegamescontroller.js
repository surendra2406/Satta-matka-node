exports.starlineGamesCategory = (req,res)=>{
    const data = {type:2,fileName:'starline/a'}
    res.render('admin_layout/index',{title:"Starline Games Management",banner_title:"Starline Games Type",data:data})
}

exports.addStarlineGamesCategory = (req,res,next) =>{
    var id = req.params.id
    const data = {type:2,fileName:'starline/a'}
    res.render('admin/starline/b',)
}

exports.starlineGames = (req,res)=>{
    const data = {type:2,fileName:'starline/c'}
    res.render('admin_layout/index',{title:"Starline Games",data:data})
}

exports.addStarlineGames = (req,res,next) =>{
    var id = req.params.id
    const data = {type:2,fileName:'starline/a'}
    res.render('admin/starline/d',)
}

