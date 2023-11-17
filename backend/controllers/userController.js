const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
        return res.json({ message: 'User already registered', status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
        return res.json({ message: 'Email already registered', status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    
}