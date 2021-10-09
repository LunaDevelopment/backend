import { Router, Response } from '.';
import * as jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import passport from 'passport';

const router = Router();

router.get('/', (req, res) => {
    res.render('login');
});

//main discord
router.get('/discord', passport.authenticate('discord'));

router.post('/', async (req, res: Response) => {
    try {
        if (req.headers['authorization']) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const recieved: any = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET as string);
            if (!recieved.email) {
                return res.status(401).send({
                    message: 'token authentication failure'
                });
            }

            const { email, password } = recieved;
            const dbrq = await res.locals.Users.findOne({
                where: { email }
            });

            if (!dbrq) {
                console.log('email doesnt exists');
                return res.status(401).send({
                    message: 'email does not exist'
                });
            }

            if (dbrq.logintype === 'discord') {
                return res.status(401).send({
                    message: 'please login through discord'
                });
            }

            const verifyPass = await argon2.verify(dbrq.password, password);
            if (!verifyPass) {
                return res.status(401).json({
                    message: 'incorrect password'
                });
            }

            res.json({ email, username: dbrq.username }).send();
        } else {
            return res.status(401).send({
                message: 'no token'
            });
        }
    } catch (error) {
        return res.status(401).send({
            message: `unexpected error: ${error}`
        });
    }
});

export default router;
