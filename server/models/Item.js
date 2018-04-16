const mongoose = require('mongoose');

const Item = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  },
  title: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  url: {
    type: String
  },
  quantity: {
    type: Number,
    default: 0
  },
  created_date: { 
    type: Date, 
    default: Date.now 
  }

});

module.exports = mongoose.model('Item', Item);



