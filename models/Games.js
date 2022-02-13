var mongoose = require('mongoose');
/**
 * Service Schema
 */
var Game = new mongoose.Schema(
    {
        game_name: {
            type: String,
            trim: true,
        },
        open_time: {
            type: String,
            trim: true,
        },
        close_time: {
            type: String,
            trim: true
        },
        open_time_sort: {
            type: String,
            trim: true
        },
        status: {
            type: Boolean,
            default:true
        },
        flash_status:{
            type:Boolean,
            default:false
        },
        insert_date: {
            type: Date
        },
        schedule:[
            {
                week_day:{
                    type:String
                },
                open_time:{
                    type:String
                },
                close_time:{
                    type:String
                },
                schedule_status:{
                    type:Boolean,
                    default:true
                }

            }
        ]

    },
    {
        timestamps:true
    }
);


const Games = mongoose.model("Games", Game);

module.exports = Games