const User = require('../models/User')
const bycrypt = require('bycryptjs')

const register = async (req,res) => {
    try{
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already Exists"});
        }

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save()

        res.status(200).json({message:'Account created Successfully'});
    } catch (error){
        console.log('Error in register')
        res.status(500).json({message: 'Server error during registratiion'});
    }
};

module.exports = {register};