import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import discord from '../utils/discord';
import User from '../models/User';

dotenv.config({
    path: path.join(__dirname, '../../.env')
});
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const router = express.Router();

router.post('/stripe', (req, res) => {
    const errMsg = 'Invalid Input, this endpoint only accepts verified cancellation requests.';
    stripe.events.retrieve(req.body.id, (err, event) => {
        if (err) return res.status(400).json({
            message: errMsg
        });
        if (event.type !== 'customer.subscription.deleted') {
            return res.status(200).json({
                message: errMsg
            });
        } else {
            
            const subscriptionID = req.body.data.object.id;

            User.findOneAndRemove({
                subscriptionID: subscriptionID
            }, async (err, user) => {
                if (!err && user) {

                    try {
                        const dashboardUser = await BanditUser.findOne({
                            identifier: user._id
                        }).exec();
                        discord.removeFromGuild(process.env.DISCORD_BOT_TOKEN, process.env.GUILD_ID, dashboardUser.discordID, (err, body) => {
                            return res.status(200).json({
                                message: `User deleted: ${customerID}`
                            });
                        });
                    } catch (e) {
                        return res.status(400).json({
                            message: e
                        });
                    }

                } else {
                    return res.status(400).json({
                        message: 'Error occured while trying to resolve user.'
                    });
                }
            });

        }
    });
});

 /* Message User Notifying them */
//  discord.createDMChannel(process.env.DISCORD_BOT_TOKEN, req.user.discordID, (err, body) => {
                          
// });

export default router;