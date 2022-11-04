const { default: mongoose } = require('mongoose');

const { Supplier } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  const id = '63623f180b99f96759d9cc30';
  Supplier.findById(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
