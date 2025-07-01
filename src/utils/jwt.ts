import { IUser } from "../api/users/user.model";
import jwt, { SignOptions } from 'jsonwebtoken'
export const signJwt = (user: IUser) => {
    const payload = {
        sub: user._id,
        iat: Date.now()
    }
    const { JWT_EXPIRES, JWT_SECRET } = process.env;
    if (!JWT_SECRET || !JWT_EXPIRES) {
        throw new Error('JWT env variables are not defined')
    }

    const options: SignOptions = {
        expiresIn: JWT_EXPIRES,
        algorithm: 'HS256'
    }
    return jwt.sign(payload, JWT_SECRET, options)

}