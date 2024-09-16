const axios = require('axios');

const initialize = async (email, amount, currency) => {
  const reference = `${Math.floor(Math.random() * 1000000000 + 1)}`;
  const params = {
    email,
    amount: amount * 100,
    reference: reference.toString(),
    currency,
  };
  try {
    const response = await axios.post(`${process.env.PAYSTACK_URL}/initialize`, params, {
      headers: {
        Authorization: `Bearer ${process.env.PUBLIC_KEY}`, // where you place your secret key copied from your dashboard
        'Content-Type': 'application/json',
      },
    });
    // console.log(response.data.data.authorization_url);
    const paymentData = { authorization_url: response.data.data.authorization_url, reference };
    return paymentData;
  } catch (error) {
    // console.log(error);
    // Handle any errors that occur during the request
    return error;
  }
};

//  "email": "oladipupomichael9@gmail.com",
//   "amount": "1000",
//   "paymentMethod": "fiat",
//   "currency": "NGN",
module.exports = { initialize };
