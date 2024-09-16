const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const paymentSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentMethod: { type: String, required: true, enum: ['fiat', 'crypto'] },
  status: { type: String, default: 'pending' ,enum: ['successful','pending', 'failed']},
  reference: { type: String, required: true, unique: true },
  donorEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);



/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
