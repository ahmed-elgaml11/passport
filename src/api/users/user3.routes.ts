import express from "express";
import passport from "passport";
const router = express.Router();
import { signJwt } from '../../utils/jwt'
import { log } from "console";
router.get('/login', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
}));

router.get(
    '/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login', }), (req, res) => {
        if (req.user) {
            const user = req.user;
            const token = signJwt(user);

            res.cookie('jwt', token, {
                maxAge: 10 * 60 * 100,
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            })
            res.redirect('http://localhost:5500/client/oauth-success.html')
        }else{
            res.redirect('http://localhost:5500/client/index.html')
        }

    }
)


router.get(
    '/protected',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.send(`Hello ${req.user?.name}, you are authenticated`);
    }
);

export default router