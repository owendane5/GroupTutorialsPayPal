const express = require('express');
const router = express.Router();
const paypalService = require('../services/paypalServices');
// Route for purchase page
// When the user clicks on the purchase button, the /purchase/pay route is called.
// This is the json object that is sent to the paypal api
router.post('/pay', async (req, res) => {
    const orderData = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                items: [
                    {
                        name: 'Node.js PayPal',
                        description: 'Node.js Complete Guide for paypal Api',
                        quantity: 1,
                        unit_amount: {
                            currency_code: 'USD',
                            value: '100.00'
                        }
                    }
                ],
                amount: {
                    currency_code: 'USD',
                    value: '100.00',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '100.00'
                        }
                    }
                }
            }
        ],
        // Application context is context for the application
        application_context: {
            return_url: process.env.APP_BASE_URL + '/purchase/complete-order',
            cancel_url: process.env.APP_BASE_URL + '/purchase/cancel-order',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            brand_name: 'amazing.io'
        }
    };
    // Create order method is called with orderData
    try {
        const url = await paypalService.createOrder(orderData);
        res.redirect(url);
    } catch (error) {
        res.send('Error: ' + error.message);
    }
});
    // Route for complete order
router.get('/complete-order', async (req, res) => {
    try {
        await paypalService.capturePayment(req.query.token);
        res.send('Course purchased successfully');
    } catch (error) {
        res.send('Error: ' + error.message);
    }
});
    // Route for cancel order
router.get('/cancel-order', (req, res) => {
    res.redirect('/');
});

module.exports = router;