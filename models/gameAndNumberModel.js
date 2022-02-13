var mongoose = require('mongoose');

var SingleDigitSchema = new mongoose.Schema(
    {
        single_digit: {
            type: Array,
            trim: true},

        insert_date: {
            type: Date
        },
    },
);
exports.singleDigitModel= mongoose.model("singleDigit", SingleDigitSchema);

// module.exports = sigleDigitModel



var jodidigitschema = new mongoose.Schema(
    {
        jodi_digit: {
            type: Array,
            trim: true},

             insert_date: {
            type: Date
        },
    },
);
exports.jodiDigitModel= mongoose.model("jodidigit", jodidigitschema);

//module.exports = jodiDigitModel


var singlepanaschema = new mongoose.Schema(
    {
             single_pana: {
            type: Array,
            trim: true},

            sr_no:{
                type:Array,
                trim:true,
            },
            
             insert_date: {
            type: Date
        },
    },
);
exports.singlePanaModel= mongoose.model("singlepana", singlepanaschema);

//module.exports = singlePanaModel


var doublepanaschema = new mongoose.Schema(
    {
        double_pana: {
            type: Array,
            trim: true},

            sr_no:{
                type:Number,
                trim:true,
            },
            
             insert_date: {
            type: Date
        },
    },
);
exports.doublePanaModel= mongoose.model("doublepana", doublepanaschema);

//module.exports = doublePanaModel



var triplepanaschema = new mongoose.Schema(
    {
        triple_pana: {
            type: Array,
            trim: true},
            
             insert_date: {
            type: Date
        },
    },
);
exports.TriplePanaModel= mongoose.model("triplepana", triplepanaschema);

//module.exports = TriplePanaModel


var halfSangam = new mongoose.Schema(
    {
        half_sangam_open:[
            {
                open_ank:{
                    type:String
                }
            }       
        ],
        half_sangam_close:[
            {
                close_ank:{
                    type:String
                }
            },
        ]
    },
);
exports.HalfSangamModel= mongoose.model("halfsangamnew", halfSangam);

//module.exports = HalfSangamModel

var fullSangam = new mongoose.Schema(
    {
        full_sangam_open:[
            {
                open_ank:{
                    type:String
                }
            }       
        ],
        full_sangam_close:[
            {
                close_ank:{
                    type:String
                }
            },
        ]
    },
);
exports.FullSangamModel= mongoose.model("fullsangamnew", fullSangam);

// module.exports = fullSangam