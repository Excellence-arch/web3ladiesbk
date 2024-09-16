const axios = require("axios");

const initialize = async (email, amount) => {
  try {
    reference = `${Math.floor(Math.random() * 1000000000 + 1)}`;
    const params = {
      email,
      amount: amount * 100,
      reference,
      currency: "NGN",
    };
    const response = await axios.post(
      `${process.env.PAYSTACK_URL}/initialize`,
      { ...params },
      {
        headers: {
          Authorization: `Bearer ${process.env.PUBLIC_KEY}`, // where you place your secret key copied from your dashboard
          "Content-Type": "application/json",
        },
      }
    );
    return {
      authorization_url: response.data.data.authorization_url,
      reference,
    };
  } catch (error) {
    // Handle any errors that occur during the request
    return error;
  }
};
module.exports=(initialize)