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
    scope: ['identify', 'guilds.join']
}, (accessToken, refreshToken, profile, cb) => {
            BanditUser.findOne({
                discordID: profile.id
            }, (err, banditUser) => {
                if (!banditUser) {
                    const newBanditUser = new BanditUser({
                        identifier: null,
                        discordID: profile.id,
                        avi: profile.avatar,
                        username: profile.username,
                        discriminator: profile.discriminator,
                        accessToken: accessToken,
                        refreshToken:refreshToken
                    });
                    newBanditUser.save(() => {
                        return cb(null, newBanditUser);
                    });
                } else {
                    banditUser.avi = profile.avatar;
                    banditUser.discordID = profile.id,
                    banditUser.username = profile.username;
                    banditUser.discriminator = profile.discriminator;
                    banditUser.accessToken = profile.accessToken;
                    banditUser.refreshToken = profile.refreshToken;
                    banditUser.save(() => {
                        return cb(null, banditUser);
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