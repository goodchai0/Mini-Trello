const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
    try {
        const { name, password, email } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({success:false,
                message: "Bad request",
            });
        }

        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res
                .status(409)
                .send({success:false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name,
            email,
            password: hashedPassword,
        });

        await userData.save();
        const userDetails = await User.findOne({ email });
        const token = jwt.sign(
            { userId: userDetails._id },
            process.env.SECRET_KEY
        );

        res.send({success:true, data:{
            message: "User registered",
            name: userDetails.name,
            token
        } });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({success:false,
                errorMessage: "Bad Request! Invalid credentials",
            });
        }

        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res
                .status(401)
                .send({success:false, message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!passwordMatch) {
            return res
                .status(401)
                .send({success:false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: userDetails._id },
            process.env.SECRET_KEY
        );

        res.cookie("token", token, { httpOnly: true });

        res.send({success:true,data:{
            message: "User logged in",
            name: userDetails.name,
            token
        }});
    } catch (error) {
        next(error);
    }
};


const updateUser = async (req, res,  next) => {
    try {
        console.log(req.userId)
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({success:false, message: 'User not found' });
        }

        // Check if the old password matches the current password
        const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send({success:false, message: 'Incorrect password' });
        }

        // Update the password and name (if provided)
        user.password = req.body.newPassword ? await bcrypt.hash(req.body.newPassword, 10) : user.password;
        user.name = req.body.name || user.name;

        await user.save();
        res.send({success:true,user});
    } catch (error) {
        next(error);
    }
};

module.exports = { loginUser, registerUser, updateUser };
