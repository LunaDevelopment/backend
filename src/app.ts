import express, { Request, Response } from 'express';
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import indexRouter from './routes/index';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import models from './models';
import logger from 'morgan';

const app = express();

app.set('views', __dirname + '/../Assets/views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/../Assets/public'));

app.use(function (req: Request, res, next) {
    res.locals = models;
    next();
});

app.use('/', indexRouter);
app.use('/register', registerRouter);
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
