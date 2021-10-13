import express, { Router } from 'express';
import { Models } from '../models';
import passport from 'passport';

const router = Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'MoonBoard' });
});

router.get('/redirect', passport.authenticate('discord'), (req, res) => {
    const c = req.cookies['discord.oauth']
    res.setHeader('Set-Cookie',`discord.oauth=${c}; Max-Age=604800; HttpOnly, Secure`);
    res.status(200).send().redirect('http://localhost:8080/');
});

interface Response extends express.Response {
    locals: typeof Models;
}

export default router;
export { Router, Response };
