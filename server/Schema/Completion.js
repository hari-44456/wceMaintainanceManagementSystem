const mongoose=require('mongoose');
const CompletionSchema=new mongoose.Schema({
    cid:{
        type:ObjectId,
        required:true,
    }, 
    CompletionData:{
         type:Date,
         required:true,
          
     },
     SignDate:{
         type:String,
         required:true,
         
     },
     Staff:{
         type:String,
         required:true,
     },
     
     Ao:{
         type:String,
         required:true,
     }


});
module.exports = mongoose.model('Completion', CompletionSchema);