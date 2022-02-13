var mongoose = require('mongoose');
/**
 * Service Schema
 */
var User = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    lowercase: true,
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
      default:false
  }
},
/*
 {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
    }
    */
   {
       timestamps:true
   }
  );

module.exports = mongoose.model("Users", User);

