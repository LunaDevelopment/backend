import { Router } from '.';
import passport from 'passport';

const router = Router();

router.get('/discord', passport.authenticate('discord'));

router.get('/auth', (req, res) => {
    res.json(req.user);
});

export default router;
