import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    uid: String,
    username: { type: String, required: [true, 'Username is requierd'] },
    email: { type: String, required: [true, 'email is requierd'] },
    password: { type: String, required: [true, 'Password is requierd'] },
    address: { type: String, required: [true, 'Address is requierd'] },
    phoneNo: {
        type: String,
        required: [true, 'Please insert a valid phone number']
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true });


UserSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt)

    next()
});

UserSchema.methods.comparePwd = async function (userPwd) {
    const compare = bcryptjs.compare(userPwd, this.password);
    return compare;
}

export const User = mongoose.model("User", UserSchema);
