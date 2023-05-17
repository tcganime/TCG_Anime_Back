import express, { Request, Response } from 'express';
import User from '../models/user.model';
import { SHA512 } from 'crypto-js';
import * as check from '../utils/check_functions'
import jwtFunctions from '../jwt/jwt.functions';

const router = express.Router();

// basic routes

router.post('/register', async (req: Request, res: Response) => {
    try {
      const pass = SHA512(req.body.password).toString();
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: pass,
        admin: false,
        victories: 0,
        defeats: 0
      });
      let token: string = jwtFunctions.createJWT(user.id.toString(), user.admin);
      res.status(201).json({ 'token': token, 'admin': user.admin.toString() });
    } catch (error : any) {
      res.status(400).json({ error: error.message });
    }
  });

router.post('/login', async (req: Request, res: Response) => {
    let pass = SHA512(req.body.password).toString();
    User.findOne({
        where: {
            username: req.body.username,
            password: pass
        }
    }).then((user: User | null) => {
        if (user === null)
            res.status(404).send({error: 'User is not found !'})
        else {
            let token: string = jwtFunctions.createJWT(user.id.toString(), user.admin);
            res.status(200).json({ 'token': token, 'admin': user.admin.toString() });
        }
    }).catch((err: Error) => {
        res.status(500).send({error: err.message})
    })
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

router.post('/delete', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    const { id, admin } = req.body
    if (!admin)
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

// admin routes

router.get('/', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    console.log(req.body)
    const { admin } = req.body
    if (!admin)
        res.status(403).send({error: 'You are not allowed to do this !'})
    else {
        let users : User[] | null = await User.findAll()
        if (users === null)
            res.status(404).send({error: 'Users are not found !'})
        else {
            res.status(200).send({
                'users': users
            })
        }
    }
})

router.post('/admin', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    console.log("body: ", req.body)
    const { id, admin } = req.body
    if (!admin)
        res.status(403).send({error: 'You are not allowed to do this !'})
    else {
        User.findOne({where: {id}}).then((user: any) => {
            user.update({
                admin: true
            })
            res.status(200).send({message: 'User is now admin !'})
        }).catch((err: Error) => {
            res.status(404).send({error: 'User is not found !'})
        })
    }
})

export default router;