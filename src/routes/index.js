import express from 'express';

const router = express.Router();

export default (passport) => {
    
    router.get('/', async (req, res) => {
        if (req.user) {
            return res.redirect('/users/profile');
        } else {
            return res.redirect('/auth/discord');
        }
    });

    router.get('/auth/discord', passport.authenticate('discord'));

    router.get('/auth/discord/callback', passport.authenticate('discord', {
        failureRedirect: '/error',
        successRedirect: '/',
    }), (req, res) => {
        res.redirect('/secretstuff');
    });

    return router;
}