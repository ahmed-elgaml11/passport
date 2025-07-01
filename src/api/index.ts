import express from "express";
import firstResponse from "../types/firstResponse";
import userRoutes from './users/user.routes'
import userRoutes2 from './users/user2.routes'
import userRoutes3 from './users/user3.routes'

const router = express.Router();

router.get<{}, firstResponse>('/', (req, res) => {
    res.json({
        message: 'hello from api.'
    })
})

router.use('/users/local', userRoutes)
router.use('/users/jwt', userRoutes2)
router.use('/users/google', userRoutes3)
export default router