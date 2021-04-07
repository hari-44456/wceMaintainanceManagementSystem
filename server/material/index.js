const router = require('express').Router();

const { validatePost, validateUpdate, validateDelete } = require('./validate');
const { verifyAdmin } = require('../verifyAuthToken');
const Material = require('./model');
const Store = require('../store/model');
var ObjectId = require('mongoose').Types.ObjectId;

router.all('*', verifyAdmin, (req, res, next) => next());

router.get('/', async (req, res) => {
  try {
    const data = await Material.find();
    return res.status(200).json({
      success: 1,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: 0,
      error: 'Unable to find data',
    });
  }
});

router.post('/', validatePost, async (req, res) => {
  try {
    const complaintId = ObjectId(req.body.complaintId);
    const existingMaterial = await Material.findOne({
      complaintId,
    });

    if (req.body.type === 'available') {
      let data;
      if (!existingMaterial) {
        const newMaterial = new Material({
          complaintId: ObjectId(req.body.complaintId),
          sign: req.body.sign,
          availableInStore: [
            {
              materialId: req.body.materialId,
              quantity: req.body.quantity,
            },
          ],
        });

        data = await newMaterial.save();
      } else {
        existingMaterial.availableInStore.push({
          materialId: ObjectId(req.body.materialId),
          quantity: req.body.quantity,
        });
        data = await existingMaterial.save();
      }
      //reduce no of units from material collection
      await Store.updateOne(
        { _id: req.body.materialId },
        { $inc: { quantity: -req.body.quantity } }
      );
      return res.status(200).json({
        success: 1,
        data,
      });
    } else {
      if (!existingMaterial) {
        const newMaterial = new Material({
          complaintId: ObjectId(req.body.complaintId),
          sign: Req.body.sign,
          orderedMaterial: [
            {
              material: req.body.material,
              approxCost: req.body.approxCost,
              quantity: req.body.quantity,
            },
          ],
        });

        const data = await newMaterial.save();
        return res.status(200).json({
          success: 1,
          data,
        });
      } else {
        existingMaterial.orderedMaterial.push({
          material: req.body.material,
          approxCost: req.body.approxCost,
          quantity: req.body.quantity,
        });
        const data = await existingMaterial.save();
        return res.status(200).json({
          success: 1,
          data,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: 0,
      error: 'Could not add material',
    });
  }
});

router.put('/:id', validateUpdate, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'Id not provided',
      });

    if (req.body.type === 'available') {
      const material = await Store.findOne(
        { _id: req.params.id },
        { quantity: 1 }
      );
      const availableQuantity = material.quantity;

      const totalQuantity =
        parseInt(req.body.unitsBeforeEditing) + parseInt(availableQuantity);

      if (req.body.quantity > totalQuantity)
        return res.status(400).json({
          success: 0,
          error:
            'Requested No Of Units Does not Exist In Store...Please Contact Store',
        });

      const response = await Material.updateOne(
        {
          complaintId: ObjectId(req.body.complaintId),
          'availableInStore._id': ObjectId(req.params.id),
        },
        { $set: { 'availableInStore.$.quantity': req.body.quantity } },
        { new: true }
      );

      await Store.updateOne(
        { _id: req.params.id },
        {
          $set: {
            quantity: parseInt(totalQuantity) - parseInt(req.body.quantity),
          },
        }
      );

      return res.status(200).json({
        success: 1,
        data: response,
      });
    } else {
      const response = await Material.updateOne(
        {
          complaintId: ObjectId(req.body.complaintId),
          'orderedMaterial._id': ObjectId(req.params.id),
        },
        {
          $set: {
            'orderedMaterial.$.material': req.body.material,
            'orderedMaterial.$.quantity': req.body.quantity,
            'orderedMaterial.$.approxCost': req.body.approxCost,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        success: 1,
        data: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: 0,
      error: 'Unable to update data',
    });
  }
});

router.delete('/:id', validateDelete, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'Id not provided',
      });
    if (req.body.type === 'available')
      await Material.updateOne(
        { complaintId: req.body.complaintId },
        { $pull: { availableInStore: { _id: req.params.id } } }
      );
    else
      await Material.updateOne(
        { complaintId: req.body.complaintId },
        { $pull: { orderedMaterial: { _id: req.params.id } } }
      );

    await Store.updateOne(
      { _id: req.params.id },
      { $inc: { quantity: req.body.quantity } }
    );
    return res.status(200).json({
      success: 1,
    });
  } catch (error) {
    return res.status(400).json({
      success: 0,
      error: 'Unable to delete record',
    });
  }
});

module.exports = router;
