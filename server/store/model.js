const mongoose = require('mongoose');

const storeschema = new mongoose.Schema({
  item :{
      type:String,
      required:true,
  },
  quantity:{
      type:Number,
      required:true,      
  },price:{
      type:Number,
      required:true,
  },
});

module.exports = mongoose.model('Store', storeschema);
