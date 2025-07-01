import passport from "passport";
import { Strategy as googleStrategy, StrategyOptions } from "passport-google-oauth20";
import jwt from 'jsonwebtoken'
import { User } from '../api/users/user.model';
import path from 'path'
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../config.env') })

const options: StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_REDIRECT_URL
}

passport.use(new googleStrategy(options,
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    // email: profile.emails?.[0].value,
                });
            }
            return cb(null, user);

        }
        catch (err) {
            return cb(err, false);
        }
    }
));