import { Request, Response, NextFunction } from 'express';
import secret_key from './secret_key';
import * as jwt from 'jsonwebtoken';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(500).json({ message: 'Absent token' });
    }
  
    try {
        const decodedToken: { id: string, admin: boolean } = jwt.verify(token, secret_key.getSecretKey) as { id: string, admin: boolean };
        console.log(decodedToken)
        if (req.body?.id) {
            if (decodedToken.id !== req.body.id)
                req.body = { ...req.body, admin: decodedToken.admin, pub: false };
            else
                req.body = { ...req.body, admin: decodedToken.admin, pub: false };
        } else {
            req.body = { ...req.body, admin: decodedToken.admin, pub: true, id: decodedToken.id };
        }
        next();
    } catch (error: any) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Expired token' });
        } else {
            return res.status(401).json({ message: 'Invalid Token', error: error.message });
        }
    }
};

function createJWT(id: string, admin: boolean) : string {
    const token = jwt.sign({ id, admin }, secret_key.getSecretKey, { expiresIn: '2h' });
    return token;
}
  
export default { verifyJWT, createJWT }
  