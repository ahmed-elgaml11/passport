import passport from "passport";
import { Strategy as jwtStrategy, ExtractJwt, VerifiedCallback, StrategyOptionsWithoutRequest } from "passport-jwt";
import jwt from 'jsonwebtoken'
import { User } from '../api/users/user.model';
import path from 'path'
import dotenv from 'dotenv';
dotenv.config({path: path.join(__dirname, '../../config.env')})


const options: StrategyOptionsWithoutRequest = {
    secretOrKey: process.env.JWT_SECRET as string,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    algorithms: ['HS256'],
}
const verifyCallback = async (jwt_payload: jwt.JwtPayload, done: VerifiedCallback) => {
    try {
        const user = await User.findOne({ _id: jwt_payload.sub })
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
    catch (err) {
        return done(err, false);
    }

}
const strategy = new jwtStrategy(options, verifyCallback)

passport.use(strategy)