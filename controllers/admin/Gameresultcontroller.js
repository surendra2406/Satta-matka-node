exports.declareGamesResult = (req,res) =>{
    const data = {type:2,fileName:'result/a'}
    res.render('admin_layout/index',{title:"Decalre Game Result",data:data})
}