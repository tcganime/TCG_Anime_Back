import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../models/user.model';
import { SHA512 } from 'crypto-js';
import * as check from '../utils/check_functions'

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    const { username, email, password, admin} = req.body;
    const userVerif: User | null = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });

    if (userVerif !== null) {
        if (userVerif.username === username)
            res.status(400).json({ error: 'Username already taken' });
        else
            res.status(400).json({ error: 'Email already taken' });
    }

    if (!check.check_password(password) || !check.check_email(email))
        res.status(400).json({ error: 'Invalid password or email' });

    let pass: string = SHA512(password).toString();
    await User.create({ username, email, password: pass, admin }).then((user: User) => {
        res.status(201).json({
            'message': 'User created',
            'username': user.username,
            'email': user.email  
        })
    }).catch((err: Error) => {
        res.status(400).json({ error: err.message });
    });
});