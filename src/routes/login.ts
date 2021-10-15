import { Router } from '.';
import passport from 'passport';

const router = Router();

router.get('/discord', passport.authenticate('discord'));

router.get('/auth', (req, res) => {
        if (req.user) {
            res.send({
                message: 'success',
                data: req.user
            });
        } else {
            res.send({
                message: 'not logged in'
            });
        }
});

export default router;
