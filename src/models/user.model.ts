import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true   // Adding an index for faster search by username
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true   // Adding an index for faster search by email
    },

    password: {
        type: String,
        required: true,
        trim: true
    }

}, {
    timestamps: true
})

userSchema.index({
    username: 1,
    email: 1
})



const User = mongoose.model("User", userSchema);

export default User;