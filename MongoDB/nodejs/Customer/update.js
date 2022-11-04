const { default: mongoose } = require('mongoose');

const { Customer } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  const id = '63623f180b99f96759d9cc30';
  const data = { name: 'New Name' };
  Customer.findByIdAndUpdate(id, data, {
    new: true,
  }).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
