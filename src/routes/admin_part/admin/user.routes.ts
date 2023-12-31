import express, { Request, Response } from 'express';
import { SHA512 } from 'crypto-js';
import * as check from '../../utils/check_functions'
import jwtFunctions from '../../../jwt/jwt.functions';
import { Document, ObjectId } from 'mongoose';

const UserSchema = require('../../../schema/UserSchema');
const router = express.Router();

interface User extends Document {
    username: string,
    _id: ObjectId,
    admin: boolean,
    email: string,
    victories: number,
    defeats: number,
    password: string
}

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