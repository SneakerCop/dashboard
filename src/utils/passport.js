import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: path.join(__dirname, '../../.env')
});

import passport from 'passport';
import {
    Strategy as DiscordStrategy
} from 'passport-discord';

import DashboardUser from '../models/DashboardUser';
import User from '../models/User';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    DashboardUser.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK,
    scope: ['identify', 'guilds.join']
}, (accessToken, refreshToken, profile, cb) => {
    DashboardUser.findOne({
        discordID: profile.id
    }, (err, dashboardUser) => {
        if (!dashboardUser) {
            const newDashboardUser = new DashboardUser({
                identifier: null,
                discordID: profile.id,
                avi: profile.avatar,
                username: profile.username,
                discriminator: profile.discriminator,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
            newDashboardUser.save(() => {
                return cb(null, newDashboardUser);
            });
        } else {
            dashboardUser.avi = profile.avatar;
            dashboardUser.discordID = profile.id,
                dashboardUser.username = profile.username;
            dashboardUser.discriminator = profile.discriminator;
            dashboardUser.accessToken = profile.accessToken;
            dashboardUser.refreshToken = profile.refreshToken;
            dashboardUser.save(() => {
                return cb(null, dashboardUser);
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