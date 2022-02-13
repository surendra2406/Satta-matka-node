var mongoose = require('mongoose');
/**
 * Service Schema
 */
var Admin = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default:""
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    default:""
  },
  password: {
    type: String,
    trim: true
  },
  status: {
    type: Boolean,
    default:true
  },
  insert_date: {
    type: Date
  },
  is_admin:{
    type:Boolean,
    default:true
  },
  admin_type:{
    type:Number,
    default:1
  }
  ,
  pass_verify_code:{
    type: String,
    default: ""
  },
  pass_expiry_time:{
    type: Date,
    default: new Date()
  },
  for_pass_status:{
      type:Number,
      default: 0
  }

},
 {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
    }
   /* {
       timestamps:true
   } */
});

module.exports = mongoose.model("Admins", Admin);

