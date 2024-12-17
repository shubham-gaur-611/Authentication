import UserModel from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
        const usermodel = new UserModel({ name, email, password });
       usermodel.password = await bcrypt.hash(password, 10);
        await usermodel.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid credentials" });
        }
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        })  

        res.status(201).json({ message: "Login successful", token: jwtToken,name:user.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { signup, login }