const { default: mongoose } = require('mongoose');

const { Customer } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  const data = {
    fistName: 'Ban ',
    lastName:'Nguyen',
    email: 'test21@gmail.com',
    phoneNumber:'+84911906548',
    address:'dia chi',
    birthDay:"12/12/2022"
  };

  const newItem = new Customer(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
