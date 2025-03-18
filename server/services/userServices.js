import { User } from "../model/userSchema.js";
import { tokenUser } from "../utils/createTokenUser.js";
import { attachCookieToResponse } from "../utils/jwt.js";


class UserServices {
    async createUser(context, { username, email, password, address, phoneNo, uid, role }) {
        try {
            // await User.deleteMany();
            username = username.toLowerCase();
            email = email.toLowerCase();
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error('User already Exists');
            const newUser = new User({ phoneNo, email, username, password, address, uid, role });
            await newUser.save();
            const user = tokenUser(newUser);
            const token = attachCookieToResponse(context, { user })
            return newUser;
        }
        catch (err) {
            throw new Error("Failed to create user: " + err.message);
        }
    }
    async loginUser(context, { username, password }) {
        username = username.toLowerCase();
        if (!username || !password) return next(new BadRequestError("Username and password is required"))
        const foundUser = await User.findOne({ username });
        if (!foundUser) throw new Error('Invalid Credentials');
        const isValidPassword = await foundUser.comparePwd(password);
        if (!isValidPassword) throw new Error('Invalid Credentials');
        const user = tokenUser(foundUser);
        const token = attachCookieToResponse(context, { user });
        return { user, token };
    }
    async getAllUsers() {
        try {
            const allUsers = await User.find({}).sort('-createdAt');
            return allUsers
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async updateUser({ id, ...user }) {
        try {
            const currentUser = await User.findById({ _id: id });
            if (!currentUser) throw new Error('User does not exist');
            Object.keys(user).forEach(key => {
                if (user[key] !== undefined && key !== 'password') {
                    currentUser[key] = user.user[key];
                    // currentUser.markModified(key);  // 👈 This forces Mongoose to detect the change

                }
            });

            await currentUser.save();
            const updatedUser = await User.findByIdAndUpdate(
                { _id: id },
                { $set: user.user },
                { new: true, runValidators: true } // 👈 `new: true` ensures you get the updated record
            );
            return updatedUser;
            return currentUser;
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async deleteUser({ id }) {
        try {

            const currentUser = await User.findById({ _id: id });
            if (!currentUser) throw new Error('user does not exist');

            const deleteUser = await User.findByIdAndDelete({ _id: id })

            return { message: "user Deleted", deleteUser };
        }
        catch (err) {
            throw new Error(err)
        }
    }


}
export const userServices = new UserServices();