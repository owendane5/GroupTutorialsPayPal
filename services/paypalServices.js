const axios = require('axios');
// Function to generate access token by using client id and secret
async function generateAccessToken() {
    const response = await axios({
        url: process.env.BASE_URL + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.CLIENT_ID,
            password: process.env.SECRET
        }
    });
// Return access token
    return response.data.access_token;
}
// Create an object paypalService with two methods createOrder and capturePayment
//also uses json.stringify to convert orderData to string
const paypalService = {
    createOrder: async (orderData) => {
        const accessToken = await generateAccessToken();
        const response = await axios({
            url: process.env.BASE_URL + '/v2/checkout/orders',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(orderData)
        });

        return response.data.links.find(link => link.rel === 'approve').href;
    },
// Capture payment method 
// This method is called when the user completes the payment
    capturePayment: async (orderId) => {
        const accessToken = await generateAccessToken();

        const response = await axios({
            url: process.env.BASE_URL + `/v2/checkout/orders/${orderId}/capture`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

        return response.data;
    }
};

module.exports = paypalService;