const { default: mongoose } = require('mongoose');

const { Customer } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  Customer.find().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
