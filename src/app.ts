import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import passport from 'passport'
dotenv.config({path: path.join(__dirname, '../config.env')})
import session from 'express-session';
const MongoDBStore = require('connect-mongodb-session')(session);
import firstResponse from './types/firstResponse';
import api from './api/index'
import errorHandler from './middlewares/errorHandler';
import { AppError } from './utils/appError';
import './config/passport-local'
import './config/passport-jwt'
import './config/passport-google'

const app = express();




var store = new MongoDBStore({
  uri:  process.env.DATABASE ,
  collection: 'mySessions'
});
store.on('error', function (error: Error) {
    console.log(error);
});
app.use(express.json());
// app.use(session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
//     }
// }));

app.use(passport.initialize());
// app.use(passport.session());


// app.use((req, res, next) => {
//     console.log(req.session);
//     console.log(req.user);
//     next();
// });
app.get<{}, firstResponse>('/', (req, res) => {
    res.json({
        message: 'hello from the root'
    })
})



app.use('/api/v1', api)

app.all('*', (req, res, next) => {
    next(new AppError(`Not Found - ${req.originalUrl}`, 404))

})
app.use(errorHandler)

export default app;