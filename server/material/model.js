const mongoose = require('mongoose');

const AvailableInStoreSchema = new mongoose.Schema({
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  },
  quantity: {
    type: Number,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const OrderedMaterialSchema = new mongoose.Schema({
  material: {
    type: String,
    required: true,
  },
  approxCost: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const MaterialSchema = new mongoose.Schema({
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint',
  },
  availableInStore: {
    type: [AvailableInStoreSchema],
  },
  orderedMaterial: {
    type: [OrderedMaterialSchema],
  },
  sign: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Material', MaterialSchema);
