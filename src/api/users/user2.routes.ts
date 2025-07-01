import express from "express";
import passport from "passport";
const router = express.Router();
import { User } from "./user.model";
import { signJwt } from '../../utils/jwt'
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = signJwt(user)

        res.status(200).json({
            status: 'success',
            user: user,
            token
        })

    } catch (err: any) {
        res.status(401).json({
            status: 'fail',
            message: err.message || 'Something went wrong'
        });
    }

})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !(await user.validatePassword(password, user.password))) {
            throw new Error('Incorrect email or password')
        }

        const token = signJwt(user)
        res.status(200).json({
            status: 'success',
            user: user,
            token
        })

    } catch (err: any) {
        res.status(401).json({
            status: 'fail',
            message: err.message || 'Something went wrong'
        });
    }
})




router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(`Hello ${req.user?.name}`);
});

export default router