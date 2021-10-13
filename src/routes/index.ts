import express, { Router } from 'express';
import { Models } from '../models';
import passport from 'passport';

const router = Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'MoonBoard' });
});

router.get('/redirect', passport.authenticate('discord'), (req, res) => {
    const c = req.cookies['discord.oauth']
    res.cookie('discord.oauth', c);
    res.redirect('https://moonhideoutdev.com');
});

interface Response extends express.Response {
    locals: typeof Models;
}

export default router;
export { Router, Response };
