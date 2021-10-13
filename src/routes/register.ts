// import { Router, Response } from '.';
// import argon2 from 'argon2';
// import logger from '../logs/index';

// const router = Router();

// router.post('/', async (req, res: Response) => {
//     try {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         console.log(req);
//         const { email, username, password } = req.body;
//         const dbrq = await res.locals.Users.findOne({
//             where: { email }
//         });

//         if (dbrq) {
//             return res.status(401).send({
//                 message: 'email already exists'
//             });
//         }

//         const userRQ = await res.locals.Users.findOne({
//             where: { username }
//         });

//         if (userRQ) {
//             return res.status(401).send({
//                 message: 'username already exists'
//             });
//         }

//         if (!dbrq) {
//             const hash = await argon2.hash(password);
//             await res.locals.Users.create({
//                 email,
//                 username,
//                 password: hash
//             });
//             res.status(201).send({
//                 message: 'account created'
//             });
//         }
//     } catch (error) {
//         logger.error(error)
//         return res.status(401).send({
//             message: `unexpected error: ${error}`
//         });
//     }
// });

// export default router;
