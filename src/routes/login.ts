import { Router } from '.';
import passport from 'passport';

const router = Router();

router.get('/discord', passport.authenticate('discord'));

router.get('/auth', (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

export default router;
