import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../models/user.model';
import { SHA512 } from 'crypto-js';
import * as check from '../utils/check_functions'
import jwtFunctions from '../jwt/jwt.functions';

const router = express.Router();

// basic routes

router.post('/register', async (req: Request, res: Response) => {
    console.log(req.body);
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    let admin: boolean | undefined = req.body?.admin;
    const userVerif: User | null = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });

    if (userVerif !== null) {
        if (userVerif.username === username)
            res.status(400).json({ error: 'Username already taken' });
        else
            res.status(400).json({ error: 'Email already taken' });
    }

    if (!check.check_password(password) || !check.check_email(email))
        res.status(400).json({ error: 'Invalid password or email' });

    if (admin === undefined)
        admin = false;
    let pass: string = SHA512(password).toString();
    await User.create({ username, email, password: pass, admin }).then((user: User) => {
        let token: string = jwtFunctions.createJWT(user.id.toString(), user.admin);
        res.status(201).json({ 'token': token, 'admin': user.admin.toString() });
    }).catch((err: Error) => {
        res.status(400).json({ error: err.message });
    });
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    let pass: string = SHA512(password).toString();
    const user: User | null = await User.findOne({ where: { username, password: pass } });
    if (user === null)
        res.status(400).json({ error: 'Invalid username or password' });
    else {
        let token: string = jwtFunctions.createJWT(user.id.toString(), user.admin);
        res.status(200).json({ 'token': token, 'admin': user.admin.toString() });
    }
});


router.get('/profile', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    const { id, pub, admin } = req.body

    let user : User | null = await User.findOne({where: {id}})

    console.log(user)

    if (!user)
        res.status(404).send({error: 'User is not found !'})
    else {
        if (admin || (pub == true)) {
            res.status(200).send({
                'user': user
            })
        } else {
            res.status(200).send({
                'user': {
                    username: user.username
                }
            })
        }
    }
})

router.get('/update', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    const { id, admin, pub, username, email, password } = req.body
    if (!admin && !pub)
        res.status(403).send({error: 'You are not allowed to do this !'})
    else {
        let user : User | null = await User.findOne({where: {id}})
        if (user === null)
            res.status(404).send({error: 'User is not found !'})
        else {
            user.update({
                username: username,
                email: email,
                password: SHA512(password).toString()
            })
            res.status(200).send({message: 'User updated !'})
        }
    }
})

router.get('/delete', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    const { id, admin, pub } = req.body
    if (!admin && !pub)
        res.status(403).send({error: 'You are not allowed to do this !'})
    else {
        let user : User | null = await User.findOne({where: {id}})
        if (user === null)
            res.status(404).send({error: 'User is not found !'})
        else {
            user.destroy()
            res.status(200).send({message: 'User deleted !'})
        }
    }
})

export default router;