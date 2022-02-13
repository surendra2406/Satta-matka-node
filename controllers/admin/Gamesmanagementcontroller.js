const formidable = require('formidable');
const Games = require('../../models/Games');

exports.gamesManagement = (req,res)=>{
    const data = {type:2,fileName:'games/a'}
    res.render('admin_layout/index',{title:"Games Management",flag_name:"gameNameListTableFlag",data:data})
}

exports.addGames = async (req,res,next) =>{
    var id = req.params.id
    var gameName = '';
    if(id != 0){
        var games = await Games.findOne({'_id':id},'game_name').exec();
        gameName = games.game_name
    }   
    
    res.render('admin/games/b',{id:id,gameName:gameName})
}

exports.checkDuplicateGameName = async (req,res) =>{
    let game_name = req.body.game_name
    var games = await Games.findOne({'game_name':game_name}).exec();
    if(games != null){
        return res.send(false)
    }else{
        return res.send(true)
    }
}

exports.submitGameName = (req,res,next) =>{
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
       
        var game_id = fields.game_id
        var game_name = fields.game_name
        var old_game_name = fields.old_game_name
        var open_time=  fields.open_time
        var close_time = fields.close_time
        
        if(game_name == ''){
            return res.send({status:"error",msg:"Please Enter Game Name...."});
		}

        if(game_name != old_game_name){
            var games = await Games.findOne({'game_name':game_name});
            if(games != null){
                return res.send({status:"error",msg:"Game Name Already Exist...."});
			}
		}

        if(open_time > close_time){
            return res.send({status:"error",msg:"Game Open Time Can Not Be Greater Then Game Close Time..."});
		}

        const week = []
        var dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        var i = 0;
        dayNames.forEach(weekDays=> {
            var weekData = {
                week_day:dayNames[i],
                open_time:open_time,
                close_time:close_time,
                schedule_status:true
            }
            week.push(weekData)
            i++
        });
        
        const newGames = new Games({
            game_name: game_name,
            open_time: open_time,
            close_time: close_time,
            insert_date: new Date(),
            flash_status: false,
            schedule:week
        });


        if(game_id == 0){
            let data = await newGames.save();
            return res.send({status:"success",msg:"Game Successfully Added...."});
        }else{
            let data = await Games.updateOne(
                { _id: game_id },
                {
                    $set: { 
                        game_name: game_name
                    }
                }
            );

            console.log(data);
            return res.send({status:"update",msg:"Game Successfully Updated...."});
        }

    });   
}

exports.gameNameListGridData = (req,res) =>{
    
    var searchStr = req.body.search.value;
    var status = req.params.any
   
    if(req.body.search.value){
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{'game_name': regex}] };
    }
    else
    {
        if(status != undefined && status != 'all' ){
            if(status == 1){
                status = true
            }else{
                status = false
            }
            searchStr = { $or: [{'status': status}] };
        }else {
            searchStr={};
        }
    }

    var recordsTotal = 0;
    var recordsFiltered=0;
    
    Games.count({}, function(err, c) {
        recordsTotal=c;
        Games.count(searchStr, function(err, c) {
            recordsFiltered=c;
            Games.find(searchStr, '_id game_name open_time close_time status insert_date schedule flash_status',{'skip': Number( req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
                if (err) {
                    console.log('error while getting results'+err);
                    return;
                }
               
                var resultData = []
                var i=1
                var display_status = '';
                var market_status = '';
                var openTimeString12hr = '';
                var closeTimeString12hr = '';
                for (const rs in results)  
                {  
                    if(results[rs].status==true){
                        display_status = '<a role="button" class="changeStatus" id="success-'+results[rs]._id+'-Games-_id-status-Games-false"><span class="badge badge-success font-size-12">Yes</span></a>';
                    }else{
                        display_status = '<a role="button" class="changeStatus"  id="danger-'+results[rs]._id+'-Games-_id-status-Games-true"><span class="badge badge-danger font-size-12">No</span></a>';
                    }
                    
                    var weekSchedule = results[rs].schedule
                    weekSchedule.forEach(element => {
                        var date = new Date();
                        var weekName = date.toLocaleString('en-US', {weekday: 'long'})
                        if(element['week_day'] == weekName){
                            if(element['schedule_status']==true){
                                market_status = '<span class="badge badge-success font-size-12">Market Open</span>';
                            }else {
                                market_status = '<span class="badge badge-danger font-size-12">Market Close</span>';
                            }

                            openTimeString12hr = new Date('1970-01-01T' + element['open_time'] + 'Z')
                            .toLocaleTimeString('en-US',
                                {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                            );

                            closeTimeString12hr = new Date('1970-01-01T' + element['close_time'] + 'Z')
                            .toLocaleTimeString('en-US',
                                {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                            );
                        }
                    });

                    var nestedData={
                        sr : i,
                        game_id : results[rs]._id,
                        game_name : results[rs].game_name,
                        open_time : openTimeString12hr,
                        close_time : closeTimeString12hr, 
                        insert_date : results[rs].insert_date,
                        flash_status : results[rs].flash_status,
                        display_status: display_status,
                        market_status: market_status,
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

exports.marketOffDay = async (req,res) =>{
    var id = req.params.id
    var gamesSchedule = await Games.findOne({'_id':id},'schedule').exec();
    var schedule = gamesSchedule.schedule
    res.render('admin/games/c',{id:id,schedule:schedule})
}

exports.submitGameWeekDayOffData = async (req,res) =>{   
    let game_id = req.body.game_id
    let week_id = req.body.week_id
    let days = req.body.days
    let weekday = req.body.weekday
    let open_time = req.body.open_time
    let close_time = req.body.close_time

    let weekScheduleData = []

    for (let k = 0; k < game_id.length; k++) {
        if(open_time[k] > close_time[k]){
            return res.send({status:"error",msg:"Game Open Time Can Not Be Greater Then Game Close Time For "+days[k]});
		}

        var status = weekday.includes(days[k]);

        var weekData = {
            week_day:days[k],
            open_time:open_time[k],
            close_time:close_time[k],
            schedule_status:status
        }
        weekScheduleData.push(weekData)
    }

    console.log(weekScheduleData);

    let data = await Games.updateOne(
        { _id: game_id[0] },
        {
            $set: { 
                schedule: weekScheduleData
            }
        }
    );

    console.log(data);
    return res.send({status:"update",msg:"Market Off Day Successfully Updated.."});  
}

exports.gameFlashStatusChange = async (req,res) =>{
    var id = req.body.id
    var table = req.body.table
    var table_id = req.body.table_id
    var status_name = req.body.status_name
    var change_status_name = req.body.change_status_name

    if(change_status_name == 'true'){
        flash_status = true
        var msg='Game Successfully Add In Flash Games List';
    }else{
        flash_status = false
        var msg='Game Successfully Remove From Flash Games List';
    }

    let data = await Games.updateOne(
        { _id: id},
        {
            $set: { 
                flash_status: flash_status
            }
        }
    );
    return res.send({status:"success",msg:msg});  
}

exports.blockDataFunction = async (req,res) =>{
    var id = req.body.id
    var table = req.body.table
    var table_id = req.body.table_id
    var status_name = req.body.status_name
    var change_status_name = req.body.change_status_name
    var modal_name = req.body.modal_name
    var Cstatus
    if(change_status_name == 'true'){
        Cstatus = true
        var msg='Active Successfully';
    }else{
        Cstatus = false
        var msg='Inactive Successfully';
    }

    let data = await Games.updateOne(
        { _id: id},
        {
            $set: { 
                status: Cstatus
            }
        }
    );
    return res.send({status:"success",msg:msg});  

}