const { default: mongoose } = require('mongoose');

const { Employee } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  const data = {
    fistName: 'a ',
    lastName:'Nguyen',
    email: 'test1@gmail.com',
    phoneNumber:'+84911906548',
    address:'dia chi',
    birthDay:"11/20/2014"
  };

  const newItem = new Employee(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
