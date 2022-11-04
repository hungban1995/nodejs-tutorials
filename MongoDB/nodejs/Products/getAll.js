const { default: mongoose } = require('mongoose');

const { Product } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  Product.find().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
