import express, { Request, Response } from 'express';
//import registerRouter from './routes/register';
import loginRouter from './routes/login';
import indexRouter from './routes/index';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import { Models } from './models';
import logger from 'morgan';
import passport from 'passport';
import session from 'express-session';
import './strategies/discordOauth';
import cors from 'cors';
import compression from 'compression';

const app = express();

const allowedOrigins = ['https://moonhideoutdev.com', 'http://localhost:8080'];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

app.use(
    session({
        cookie: {
            maxAge: 60000 * 60 * 24
        },
        secret: 'yonaIsStinky',
        resave: false,
        saveUninitialized: false,
        name: 'discord.oauth'
    })
);

app.use(
    compression({
        level: 5, //Compression Level
        threshold: 100000, //in Bytes
        filter: (req, res) => {
            if (req.headers['x-no-compression']){
                return false
            }
            return compression.filter(req, res)
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/../Assets/views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/../Assets/public'));

app.use(function (req: Request, res, next) {
    res.locals = Models;
    next();
});

app.use('/', indexRouter);
//app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err: createError.HttpError, req: Request, res: Response) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

export { app };
