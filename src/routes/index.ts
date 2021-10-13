import express, { Router } from 'express';
import { Models } from '../models';
import passport from 'passport';

const router = Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'MoonBoard' });
});

router.get('/redirect', passport.authenticate('discord'), (req, res) => {
    res.cookie('discord.oauth', req.cookies['discord.oauth'], {expires: 60000 * 60 * 24 * 7});
    res.redirect(302, 'http://localhost:8080/');
});

interface Response extends express.Response {
    locals: typeof Models;
}

export default router;
export { Router, Response };
