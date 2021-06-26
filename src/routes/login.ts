import { Router, Response } from '.';
import * as jwt from 'jsonwebtoken';
import argon2 from 'argon2';

const router = Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res: Response) => {
    if (req.headers['authorization']) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recieved: any = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET as string);
        if (!recieved.email) {
            console.log('Failed to authenticate token!');
            return res.status(401).send({
                message: 'Failed to authenticate token!'
            });
        }

        const { email, password } = recieved;
        const dbrq = await res.locals.Users.findOne({
            where: { email }
        });

        if (!dbrq) {
            console.log('email doesnt exists');
            return res.status(401).send({
                message: 'email doesnt exists'
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
            message: 'No token!'
        });
    }
});

export default router;
