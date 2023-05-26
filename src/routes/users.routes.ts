import express, { Request, Response } from 'express';
import { SHA512 } from 'crypto-js';
import * as check from './utils/check_functions'
import jwtFunctions from '../jwt/jwt.functions';
import { Document, ObjectId } from 'mongoose';

const UserSchema = require('../schema/UserSchema')
const router = express.Router();

// basic routes

interface User extends Document {
    username: string,
    _id: ObjectId,
    admin: boolean,
    email: string,
    victories: number,
    defeats: number,
    password: string
}

router.post('/register', async (req: Request, res: Response) => {
    try {
        let pass = SHA512(req.body.password).toString();
        UserSchema.create({
            username: req.body.username,
            email: req.body.email,
            password: pass
        }).then((user: User) => {
            user.save()
            console.log(user._id.toString(), user.admin, user.username, user.email, user.victories, user.defeats)
            let jwt = jwtFunctions.createJWT(user._id.toString(), user.admin);
            res.status(200).json({ 'token': jwt, 'admin': user.admin.toString() });
        }).catch((err: Error) => {
            res.status(500).send({error: err.message})
        })
    } catch (error : any) {
      res.status(400).json({ error: error.message });
    }
  });

router.post('/login', async (req: Request, res: Response) => {
    let pass = SHA512(req.body.password).toString();
    UserSchema.findOne({username: req.body.username, password: pass }).then((user: User) => {
        let jwt = jwtFunctions.createJWT(user._id.toString(), user.admin);
        res.status(200).json({ 'token': jwt, 'admin': user.admin.toString() });
    }).catch((err: Error) => {
        console.log(err)
        res.status(500).send({error: err.message})
    })
});


router.get('/profile', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    const { id, pub, admin } = req.body

    if (!admin && !pub)
        return res.status(403).send({error: 'You are not allowed to do this !'})
    
    UserSchema.findOne({ _id: id }).then((user: any) => {
        if (pub)
            return res.status(200).send({username: user.username, victories: user.victories, defeats: user.defeats})
        else
            return res.status(200).send(user)
    }).catch((err: Error) => {
        res.status(500).send({error: err.message})
    })
})

router.get('/update', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    const { id, admin, pub, username, email, password } = req.body
    if (!admin || !pub)
        res.status(403).send({error: 'You are not allowed to do this !'})
    else {
        UserSchema.findOne({ _id: id }).then((user: User) => {
            user.username = username
            user.email = email
            user.password = SHA512(password).toString()
            user.save().then((user: User) => {
                res.status(201).send({message: 'User updated !'})
            }).catch((err: Error) => {
                res.status(500).send({error: err.message})
            })
        }).catch((err: Error) => {
            res.status(500).send({error: err.message})
        })
    }
})

router.post('/delete', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    const { id, admin } = req.body
    if (!admin)
        res.status(403).send({error: 'You are not allowed to do this !'})
    else {
        UserSchema.findOneAndDelete({ _id: id }).then((user: User) => {
            if (user)
                res.status(200).send({message: 'User deleted !'})
            else
                res.status(404).send({error: 'User not found'})
        }).catch((err: Error) => {
            res.status(500).send({error: err.message})
        })
    }
})

// admin routes


router.post('/admin', jwtFunctions.verifyJWT, async (req: Request, res: Response) => {
    const { id, admin } = req.body
    if (!admin)
        res.status(403).send({error: 'You are not allowed to do this !'})
    else {
        UserSchema.findOne({ _id: id }).then((user: User) => {
            user.admin = true
            user.save().then((user: User) => {
                res.status(201).send({message: 'User updated !'})
            }).catch((err: Error) => {
                res.status(500).send({error: err.message})
            })
        }).catch((err: Error) => {
            res.status(500).send({error: err.message})
        })
    }
})

export default router;