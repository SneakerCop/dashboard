import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: path.join(__dirname, '../../.env')
});

import passport from 'passport';
import {
    Strategy as DiscordStrategy
} from 'passport-discord';

import BanditUser from '../models/BanditUser';
import User from '../models/User';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    BanditUser.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK,
    scope: ['identify']
}, (accessToken, refreshToken, profile, cb) => {
    User.findOne({
        discordID: profile.id
    }, (err, user) => {
        if (!user) {
            return cb('Unauthorized User, you must be a member.', null);
        } else {
            const dbID = user._id; /* Search for user based off their ID from admin panel in case the switch their discord */
            BanditUser.findOne({
                identifier: dbID
            }, (err, banditUser) => {
                if (!banditUser) {
                    console.log('could not find user');
                    const newBanditUser = new BanditUser({
                        identifier: dbID,
                        discordID: profile.id,
                        avi: profile.avatar,
                        username: profile.username,
                        discriminator: profile.discriminator
                    });
                    newBanditUser.save(() => {
                        return cb(null, newBanditUser);
                    });
                } else {
                    console.log('found user')
                    banditUser.avi = profile.avatar;
                    banditUser.discordID = profile.id,
                    banditUser.username = profile.username;
                    banditUser.discriminator = profile.discriminator;
                    banditUser.save(() => {
                        console.log('updated user');
                        return cb(null, banditUser);
                    });
                }
            });
        }
    });
}));

export default passport;

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};