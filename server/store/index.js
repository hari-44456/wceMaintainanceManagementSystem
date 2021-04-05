const router = require('express').Router();
const Store = require('./model');
router.post('/add',(req, res)=>{
      if(!req.body.item||!req.body.quantity||!req.body.price){
          return res.status(400).send('Data Incomplete');
      }
      const entry=new Store({
            item:req.body.item,
            quantity:req.body.quantity,
            price:req.body.price,
      });
      Store.findOne({item:entry.item},async(err,doc)=>{
            if(err)return res.status(400).send(err);
            if(doc)return res.status(400).send('Entry alwredy exits');
            entry.save()
                 .then((response)=>res.send('Inserted'))
                 .catch((err)=>res.send(err));
      });
});
router.get('/',(req,res)=>{
    Store.find()
         .then((data)=>{
             res.status(200).send(data);
         })
         .catch((err)=>{
             res.status(500).send({
                 message:err.message||"Error occured",
             });
         });
});
router.delete('/:id',(req,res)=>{
    Store.findByIdAndRemove(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                message: "Item not found ",
            });
        }
        res.send({ message: "Item deleted successfully!" });
        })
        .catch((err) => {
            return res.status(500).send({
            message: "Could not delete Item ",
      });
    });
});


router.put('/:id',(req,res)=>{
    if(!req.body.item||!req.body.quantity||!req.body.price) {
        res.status(400).send({
          message: "required fields cannot be empty",
        });
      }
      Store.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              message: "no user found",
            });
          }
          res.status(200).send(data);
        })
        .catch((err) => {
          return res.status(404).send({
            message:"error while updating the post",
          });
        });
});
module.exports = router;