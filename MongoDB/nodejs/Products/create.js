const { default: mongoose } = require('mongoose');

const { Product } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/Test');

try {
  const data = {
    name: 'iPhone 15',
    price: 100,
    discount: 10,
    categoryId: '6363df1e97e5d7e24a447fed',
    supplierId:'6364af9acad6f37d4a7807ff',
  };

  const newItem = new Product(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
