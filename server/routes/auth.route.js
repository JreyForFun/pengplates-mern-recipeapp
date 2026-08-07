import express, {Router} from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken'
import { protect } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', async(req,res) => {
    const { username, email, password } = req.body;

    try {
        if(!username || !email || !password){
            res.status(400).json({
                success: false,
                message: "Please enter required fields"
            })
        }

        const userExists = await User.findOne({email})
        if(userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists" 
            })
        }

        const user = await User.create({username, email, password})

        const token = generateToken(user._id )

        res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                token
            }
        })
    } catch(e){
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})

// LOGIN 

authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email});
        if(!user || !(await user.matchPassowrd(password))){
            return res.status(401).json({
                sucess: false,
                message: "Invalid Credentials"
            })
        }

        const token = generateToken(user._id)

        res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                token
            }
        })
    
    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"})
}

authRouter.get('/me', protect, async (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user
    });
  });
  

export default authRouter;