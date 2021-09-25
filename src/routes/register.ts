import { Router, Response } from '.';
import * as jwt from 'jsonwebtoken';
import argon2 from 'argon2';

const router = Router();

router.post('/', async (req, res: Response) => {
    console.log(res);
    // console.log(req.headers['authorization']);

    if (req.headers['authorization']) {
        console.log('works');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recieved: any = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET as string);
        if (!recieved.email) {
            console.log('Failed to authenticate token!');
            return res.status(401).send({
                message: 'Failed to authenticate token!'
            });
        }

        const { email, username, password } = recieved as { [x: string]: string };
        const dbrq = await res.locals.Users.findOne({
            where: { email }
        });

        if (dbrq) {
            console.log('email already exists');
            return res.status(401).send({
                message: 'email already exists'
            });
        }

        const userRQ = await res.locals.Users.findOne({
            where: { username }
        });

        if (userRQ) {
            console.log('username already exists');
            return res.status(401).send({
                error: {
                    message: 'username already exists'
                }
            });
        }

        if (!dbrq) {
            const hash = await argon2.hash(password);
            await res.locals.Users.create({
                email,
                username,
                password: hash,
                LoginType: 'Regular'
            });
            console.log('created user');
            res.send('Account created!');
        }
    } else {
        return res.status(401).send({
            message: 'No token!'
        });
    }
});

export default router;
