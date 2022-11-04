const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html

// Validator
// https://mongoosejs.com/docs/validation.html#built-in-validators

const supplierSchema = new Schema({
  name: { type: String,maxLength:100, required:true},
  email: {maxLength:50,
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: `{VALUE} is not a valid email!`,
    },
    required: [true, 'email is required'],
  },
  phoneNumber:{type: String,
    validate: {
      validator: function (value) {
        const phoneRegex =/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
        return phoneRegex.test(value);
      },
      message: `{VALUE} is not a valid phone number!`,
    },
  
  },
  address:{
    type:String, maxLength:500, required:true
  },

});


const Supplier = model('Supplier', supplierSchema);
module.exports = Supplier;
