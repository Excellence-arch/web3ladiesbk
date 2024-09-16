// src/services/paystackService.js
const axios = require('axios');
const { initialize } = require('../utils/payment.utils');
const { Payment } = require('../models/payment.model');

const createPayment = async (data) =>{

  const amount = data.amount
  const email = data.email
  try {
    const paymentData = await initialize(email,amount)
    const form = new Payment({
      amount,
      donorEmail: email,
      paymentMethod: "fiat",
      currency: data.currency,
      reference: paymentData.reference,
    });
    try {
      await form.save();
    } catch (err) {
      return err.message;
    }
  } catch (err) {
    return err.message;
  }
  
  return paymentData
  
}
 const verifyPayment = async (reference) => {
  const paymentData = await Payment.findOne({ reference });
  const response = await axios.get(
    `${process.env.PAYSTACK_URL}/verify/${paymentData.reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PUBLIC_KEY}`,
      },
    }
  );
  const update = {
    status: response.data.data.status,
    // paymentMethod: response.data.data.channel,
    // others: response.data.data,
  };
  try {
    await Payment.findOneAndUpdate(
      { reference: paymentData.reference },
      update
    );
  } catch (err) {
    return err;
  }
};
module.exports = {createPayment, verifyPayment}

// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// exports.initializePayment = async (amount, email) => {
//   try {
//     const response = await axios.post('https://api.paystack.co/transaction/initialize', {
//       amount: amount * 100, // Paystack expects amount in kobo
//       email,
//     }, {
//       headers: {
//         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     return response.data.data;
//   } catch (error) {
//     throw new Error('Failed to initialize Paystack payment');
//   }
// };

// // Add other Paystack-related methods (verifyPayment, etc.)