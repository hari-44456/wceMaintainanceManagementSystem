const mongoose=require('mongoose');
const ApprovalSchema=new mongoose.Schema({
    cid:{
        type:ObjectId,
        required:true,
    }, 
    MateialEstimatedCost:{
         type:Number,
          required:true,
          
     },
     MateialActualCost:{
         type:Number,
         required:true,
         
    },LabourEstimatedCost:{
         type:Number,
         required:true,
         
    },
     LabourActualCost:{
        type:Number,
        required:true,
        
   },
   MisEstimatedCost:{
    type:Number,
     required:true,
     },
    MisActualCost:{
     type:Number,
     required:true,
    
    },TotalActualCost:{
         type:Number,
         
    },TotalEstimatedCost:{
          type:Number,
    },


});
module.exports = mongoose.model('Approval', ApprovalSchema);