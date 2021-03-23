const mongoose=require('mongoose');
const Material =new mongoose.Schema({
       materialName:{
           type:String,
       },
       materialCost:{
            type:Number,
       }
});
const MaterialSchema=new mongoose.Schema({
    cid:{
        type:ObjectId,
        required:true,
    }, 
    Section:{
         type:String,
          required:true,
          
     },
     MaterialIssued:{
         type:[Material],
         required:true,
         
     },
     Cost:{
         type:Number,
         required:true,
     },
     
     Sign:{
         type:String,
         required:true,
     }
    

});
module.exports = mongoose.model('Material', MaterialSchema);