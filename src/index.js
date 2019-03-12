import http from 'http';
import path from 'path';
import express from 'express';
import session from 'express-session';
import MongoConnect from 'connect-mongo';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import cors from 'cors';
import nunjucks from 'nunjucks';
import mongoose from 'mongoose';

import IndexRoutes from './routes/index';
import UserRoutes from './routes/users';
import WebhookRoutes from './routes/webhooks';

import dotenv from 'dotenv';
dotenv.config({
    path: path.join(__dirname, '../.env')
});

import passport from './utils/passport';

const corsOptions = {
    origin: '*',
};

const app = express();
app.server = http.createServer(app);
const MongoStore = MongoConnect(session);

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/* Express Init */
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/assets/css', express.static(path.join(__dirname, '../node_modules/noty/lib'))); /* noty lib */
app.use('/assets/js', express.static(path.join(__dirname, '../node_modules/noty/lib'))); /* noty lib */
app.use('/assets/css', express.static(path.join(__dirname, '../node_modules/noty/lib/themes'))); /* noty lib */

nunjucks.configure(path.join(__dirname, '../views'), {
    autoescape: true,
    watch: true,
    express: app,
});

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: process.env.MONGODB_URI,
        autoReconnect: true
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use(flash());
app.use(cors(corsOptions));

app.set('view engine', 'html');

/* Routes */
app.use('/', IndexRoutes(passport));
app.use('/users', UserRoutes);
app.use('/webhooks', WebhookRoutes);

const serverOpts = {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
};

app.server.listen(serverOpts, () => {
    app.on('shutdown', () => {
        process.exit(0);
    });
    console.log(`Server is running at http://127.0.0.1:${process.env.PORT || 3000}`);
});