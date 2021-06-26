import express, { Router } from 'express';
import { Models } from '../models';

const router = Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'MoonBoard' });
});

interface Response extends express.Response {
    locals: typeof Models;
}

export default router;
export { Router, Response };
