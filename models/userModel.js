import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: [true, `Name is a required field`],
        },
        email: {
            type: String,
            required: [true, `Email is a required field`],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, `Please provide a valid email`],
        },
        img: String,
        password: {
            type: String,
            required: [true, `Please provide your password`],
            minlength: 8,
        },
        passwordConfirm: {
            type: String,
            required: [true, `Please confirm your password`],
            validate: {
                validator: function () {
                    return this.password === this.passwordConfirm;
                },
                message: `Passwords are not same`,
            },
        },
        country: {
            type: String,
            required: [true, `Please enter your country`],
        },
        phone: String,
        desc: String,
        isSeller: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

mongoose.models = {};
const User = mongoose.model('User', userSchema);

export default User;
