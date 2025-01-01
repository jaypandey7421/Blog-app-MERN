import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next)=>{
    const {username, email, password} = req.body;

    if( !username || !email || !password || username === '' || email === '' || password === ''){
       next(errorHandler(400, 'All fields are required.'));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password : hashPassword
    });

    try{
        await newUser.save();
        res.json({"message": "Singnup successfully."});
    }catch(err){
        next(err);
    }
    
}

export const signin = async (req, res, next)=>{
    const {email, password} = req.body;
    console.log(`email: ${email}, pass: ${password}`);
    if(!email || !password || email === '' || password === ''){
        next(errorHandler(404, 'All fields are required!'));
    }

    try{
        const validUser = await User.findOne({email});
        if(!validUser){
           return next(errorHandler(400, 'User not found!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
           return next(errorHandler(400, 'Invalid Password!'));
        }

        const {password: pass, ...rest} = validUser._doc;

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY);
        res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .json(rest);
    }catch(err){
        next(err);
    }
}