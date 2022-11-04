const { default: mongoose } = require('mongoose');

const { Order } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  const data = {
    createDate:'2022-10-01',
    shippedDate: '2022-10-01',
    shippingAddress:'dia chi',
  };

  const newItem = new Order(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
