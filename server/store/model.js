const mongoose = require('mongoose');

const storeschema = new mongoose.Schema({
  material: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Store', storeschema);
