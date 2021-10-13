import express, { Router } from 'express';
import { Models } from '../models';
import passport from 'passport';

const router = Router();

router.get('/', function (req, res) {
    console.log(req.cookies)
    res.render('index', { title: 'MoonBoard' });
});

router.get('/redirect', passport.authenticate('discord'), (req, res) => {
    //res.cookie('discord.oauth');
    res.redirect('https://moonhideoutdev.com');
});

interface Response extends express.Response {
    locals: typeof Models;
}

export default router;
export { Router, Response };
