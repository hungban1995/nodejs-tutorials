const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  fistName: { type: String, required: true, maxLength: 50 },
  lastName: { type: String, required: true, maxLength: 50 },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        const phoneRegex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
        return phoneRegex.test(value);
      },
      message: `{VALUE} is not a valid phone number!`,
    },
  },
  address: {
    type: String,
    maxLength: 500,
  },
  email: {
    maxLength: 50,
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: `{VALUE} is not a valid email!`,
    },
    required: [true, "email is required"],
  },
  birthDay: {
    type: Date, 
    validate: {
      validator: (value) => {
        if (value > new Date()) {
          return false;
        }
        return true;
      },
      message: `Birth Day: {VALUE} is invalid!`,
    },
  },
});

const Customer = model("Customer", customerSchema);

module.exports = Customer;
