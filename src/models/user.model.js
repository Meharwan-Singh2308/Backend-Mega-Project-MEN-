import { Mongoose, Schema, model } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        index: true,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    fullname: {
        type: String,
        trim: true,
        index: true,
        required: true,
    },
    avatar: {
        type: String, // Cloudinary
        required: true
    },
    coverImage: {
        type: String, // Cloudinary
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    refreshToken: {
        type: String
    },
}, {
    timestamps: true
}
)




userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}












export const User = model("User", userSchema)