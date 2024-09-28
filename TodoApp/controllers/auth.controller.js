const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

// Sign-up
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        if (user) {
            const token = generateToken(user._id);
            res.status(201).json({ 
                _id: user._id,
                username: user.username,
                email: user.email,
                token 
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Sign-in
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            res.json({ 
                _id: user._id,
                username: user.username,
                email: user.email,
                token 
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerUser, authUser };
