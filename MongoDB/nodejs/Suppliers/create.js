const { default: mongoose } = require('mongoose');

const { Supplier } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  const data = {
    name: 'Ban nguyen',
    email: 'test1@gmail.com',
    phoneNumber:'+84911906548',
    address:'dia chi'
  };

  const newItem = new Supplier(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
