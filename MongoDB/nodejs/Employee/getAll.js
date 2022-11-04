const { default: mongoose } = require('mongoose');

const { Employee } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  Employee.find().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
