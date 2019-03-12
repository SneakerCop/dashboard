import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: path.join(__dirname, '../../.env')
});
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const router = express.Router();

export default () => {
    router.post('/stripe', (req, res) => {
        const errMsg = 'Invalidd Input, this endpoint only accepts verified cancellation requests.';
        stripe.events.retrieve(req.body.id, (err, event) => {
            if (err) return res.status(400).json({
                message: errMsg
            });
            console.log(req.body);
            console.log(req.query);
            if (event.type !== 'customer.subscription.deleted') {
                return res.status(200).json({
                    message: errMsg
                });
            } else {
                return res.status(200).json({
                    message: errMsg
                });
            }
        });
    });
    return router;
}