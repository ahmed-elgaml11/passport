import express from "express";
import passport from "passport";
const router = express.Router();
import { isAdmin, isAuth } from "../../middlewares/auth";

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.send('hi')
})

// or 
// router.post('/login', passport.authenticate('local', {failureRedirect: '/something', successRedirect: '/something'}))


router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.send('Bye!');
  });
});



router.get('/protect', isAuth, (req, res, next) => {
    res.send('you did it')
})
router.get('/admin', isAdmin, (req, res, next) => {
    res.send('Admin Area')
})

export default router