import { Router } from '.';
import passport from 'passport';

const router = Router();

router.get('/discord', passport.authenticate('discord'));

router.get('/auth', (req, res) => {
    const c = req.cookies['discord.oauth'];
    res.cookie('discord.oauth', c, { maxAge: 60000 * 60 * 24 * 7, httpOnly: true, sameSite: 'none', secure: true });
    console.log(req.user);
    res.send(req.user);
});

export default router;
