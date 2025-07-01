import mongoose from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser extends mongoose.Document {
    password: string;
    name: string,
    validatePassword: (pass1: string, pass2: string) => Promise<boolean>
    role: string,
    googleId: string
}

const UserSchema = new mongoose.Schema<IUser>({
    name: String,
    password: String,
    role: String
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next()

})

UserSchema.methods.validatePassword = async (userPassword: string, hashedPassword: string) => {
    return bcrypt.compare(userPassword, hashedPassword)
}

export const User = mongoose.model<IUser>('User', UserSchema);