import { Router, Response } from '.';
import * as jwt from 'jsonwebtoken';
import argon2 from 'argon2';

const router = Router();

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

            const { email, username, password } = recieved as { [x: string]: string };
            const dbrq = await res.locals.Users.findOne({
                where: { email }
            });

            if (dbrq) {
                return res.status(401).send({
                    message: 'email already exists'
                });
            }

            const userRQ = await res.locals.Users.findOne({
                where: { username }
            });

            if (userRQ) {
                return res.status(401).send({
                    message: 'username already exists'
                });
            }

            if (!dbrq) {
                const hash = await argon2.hash(password);
                await res.locals.Users.create({
                    email,
                    username,
                    password: hash
                });
                res.status(201).send({
                    message: 'account created'
                });
            }
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
