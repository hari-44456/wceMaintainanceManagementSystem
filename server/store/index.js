const router = require('express').Router();

const validate = require('./validate');
const { verify, verifyAdmin } = require('../verifyAuthToken');
const Store = require('./model');

router.use('*', verify, (req, res, next) => next());

router.get('/', async (req, res) => {
  try {
    const data = await Store.find();
    return res.status(200).json({
      success: 1,
      data,
    });
  } catch (err) {
    return res.status(400).json({
      success: 0,
      error: 'Error while fetching data',
    });
  }
});

router.post('/', validate, verifyAdmin, async (req, res) => {
  const entry = new Store({
    material: req.body.material,
    quantity: req.body.quantity,
    cost: req.body.cost,
  });

  const isPresent = await Store.findOne(
    { material: entry.material },
    { _id: 1 }
  );
  if (isPresent)
    return res.status(400).json({
      success: 0,
      error: 'Material Already Exists',
    });

  const data = await entry.save();

  return res.status(200).json({
    success: 1,
    _id: data._id,
  });
});

router.put('/:id', verifyAdmin, validate, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'Material no provided',
      });
    const data = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: 1,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: 0,
      error: 'Unable to update material',
    });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'Material no provided',
      });
    await Store.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      success: 1,
    });
  } catch (error) {
    return res.status(400).json({
      success: 0,
      error: 'Error while deleting material',
    });
  }
});

module.exports = router;
