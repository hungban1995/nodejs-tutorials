const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  shippedDate: {
    type: Date,
    validate: {
      validator: (value) => {
        if (!value) return true;
        if (value < this.createdDate) {
          return false;
        }
        return true;
      },
      message: `Shipped date: {VALUE} is invalid!`,
    },
  },
  status: {
    required: true,
    type: String,
    default: "WAITING",
    validate: {
      validator: (value) => {
        if (value !=="WAITING" && value !== "COMPLETED" && value !== "CANCELED") {
          return false;
        }
        return true;
      },
      message: `Payment type: {VALUE} is invalid!`,
    },
  },
  description: {
    type: String,
  },
  shippingAddress: {
    type: String,
    maxLength: 500,
  },

  paymentType: {
    type: String,
    required: true,
    default: "CASH",
    validate: {
      validator: (value) => {
        if (value !== "CREDIT CARD" && value !== "CASH") {
          return false;
        }
        return true;
      },
      message: `Payment type: {VALUE} is invalid!`,
    },
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});

const Order = model('Order', orderSchema);

module.exports = Order;
