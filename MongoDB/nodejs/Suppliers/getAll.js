const { default: mongoose } = require('mongoose');

const { Supplier } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  Supplier.find().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
