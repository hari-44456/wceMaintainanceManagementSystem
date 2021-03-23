const mongoose=require('mongoose');
const MaintainSchema=new mongoose.Schema({
    cid:{
        type:ObjectId,
        required:true,
    }, 
    Departmental:{
         type:String,
         required:true,
          
     },
     Details:{
         type:String,
         required:true,
         
     },
     Room:{
         type:Number,
     },
     Nature:{
         type:String,
         required:true,
     },
     Sign:{
         type:String,
         required:true,
     },
     Fund:{
         type:String,

     },
     HODSign:{
         type:String,
     },
     Status:{
         type:String,
     }

});
module.exports = mongoose.model('Maintain', MaintainSchema);