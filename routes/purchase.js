const express = require('express');
const router = express.Router();
const paypalService = require('../services/paypalServices');

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
        application_context: {
            return_url: process.env.APP_BASE_URL + '/purchase/complete-order',
            cancel_url: process.env.APP_BASE_URL + '/purchase/cancel-order',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            brand_name: 'amazing.io'
        }
    };

    try {
        const url = await paypalService.createOrder(orderData);
        res.redirect(url);
    } catch (error) {
        res.send('Error: ' + error.message);
    }
});

router.get('/complete-order', async (req, res) => {
    try {
        await paypalService.capturePayment(req.query.token);
        res.send('Course purchased successfully');
    } catch (error) {
        res.send('Error: ' + error.message);
    }
});

router.get('/cancel-order', (req, res) => {
    res.redirect('/');
});

module.exports = router;