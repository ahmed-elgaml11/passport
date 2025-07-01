// import passport from 'passport'
// import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
// import { User } from '../api/users/user.model';

// const customFields = {
//   usernameField: 'email',    
//   passwordField: 'password',
// };

// const verifyCallback = async (email: string, password: string, cb: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void) => {
//   try {

//     const user = await User.findOne({ email: email })
//     if (!user) { return cb(null, false, { message: 'The user is not found, please signup first!.' }); }

//     if (!user.validatePassword(password, user.password)) { return cb(null, false); }

//     return cb(null, user);

//   }
//   catch (err) {
//     return cb(err)
//   }

// }

// const strategy = new LocalStrategy(customFields, verifyCallback)

// passport.use(strategy)

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((userId, done) => {
//     User.findById(userId)
//         .then((user) => {
//             done(null, user);
//         })
//         .catch(err => done(err))
// });