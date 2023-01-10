import User from "../model/user.entity.js"
import bcryptjs from "bcryptjs";
import { v1 } from "uuid";
import { signInUserService } from "../helpers/signinUser.js";
import { passwordResetMail } from "../helpers/maiToUser.js";
import { resetPasswordFirstName, resetPasswordUserName } from "../helpers/mailTemplates.js";
import decodeUser from "../helpers/decodeUser.js";

class AuthService {
    async signUpUser(body) {
        try {
            const { userName, email, password, role } = body;
            const userByEmail = await User.findOne({ where: { email } })
            const userByUserName = await User.findOne({ where: { userName } })
            if (userByEmail) {
                return 0;
            } else if (userByUserName) {
                return 1;
            }
            else {
                const newPassword = await bcryptjs.hash(password, 12);
                const id = v1();
                const newSignedInUser = await User.create({
                    userId: id,
                    userName,
                    email,
                    password: newPassword,
                    role
                })
                return newSignedInUser;
            }
        } catch (error) {
            console.log("Auth Service Error : ", error)
        }
    }
    async signInUserByUserName(body) {
        try {
            const { email, password } = body;
            const userByUserName = await User.findOne({
                where: { userName: email },
                attributes: ['userId', 'password', 'userName']
            });
            if (userByUserName !== null) {
                if (email.toLowerCase() == userByUserName.userName.toLowerCase()) {
                    const value = await signInUserService(userByUserName, password);
                    return value;
                } else {
                    return 0;
                }
            } else {
                return 0
            }
        } catch (error) {
            console.log("Auth Service Error : ", error)
        }
    }
    async signInUserByEmail(body) {
        try {
            const { email, password } = body;
            const userByEmail = await User.findOne({
                where: { email },
                attributes: ['userId', 'password', 'email']
            });
            if (userByEmail !== null) {
                if (email.toLowerCase() == userByEmail.email.toLowerCase()) {
                    const value = await signInUserService(userByEmail, password);
                    return value;
                } else {
                    return 0;
                }
            } else {
                return 0
            }
        } catch (error) {
            console.log("Auth Service Error : ", error)
        }
    }
    async mailTheUser(email) {
        try {
            const user = await User.findOne({
                where: { email },
                attributes: ['userId', 'firstName', 'userName']
            })
            if (user) {
                const subject = "Password Reset Mail";
                const firstName = user.firstName;
                const userId = user.userId;
                const textOfMail = resetPasswordFirstName(userId, firstName);
                if (firstName !== null) {
                    await passwordResetMail(email, subject, textOfMail);
                } else {
                    const userName = await user.userName;
                    const userId = user.userId;
                    const textOfMail = resetPasswordUserName(userId, userName);
                    await passwordResetMail(email, subject, textOfMail);
                }
            } else {
                return "User Not Exist !!!";
            }

        } catch (error) {
            console.log("Auth Service Error : ", error)
        }
    }
    async resetPassword(userId, password) {
        try {
            const hashedVal = await bcryptjs.hash(password, 12)
            const user = await User.update({ password: hashedVal }, {
                where: { userId }
            });
            if (user) {
                return "Password Reset Sucessfully !!!"
            } else {
                return "Password Rest is Unsuccessful !!!"
            }
        } catch (error) {
            console.log("Auth Service Error : ", error)
        }
    }
    async decodeUserByToken(token) {
        try {
            const decodedVal = decodeUser(token);
            const user = await User.findOne({
                where: { userId: decodedVal.payload.userId },
            })
            return user;
        } catch (error) {
            console.log("Auth Service Error : ", error)
        }
    }
}

export default AuthService;