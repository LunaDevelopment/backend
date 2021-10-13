import { Router, Response } from '.';
import * as jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import passport from 'passport';
import logger from '../logs/index';

const router = Router();

router.get('/discord', passport.authenticate('discord'));

router.get('/auth', (req, res) => {
    if (!req.user) {
        return res.redirect('https://api44.moonhideoutdev.com/login/discord');
    }
    res.json(req.user)
})

export default router;
