import User from "../models/User";
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            return next()
        } catch (e) {
            console.error("Token vefification failed", e.message)
            return res.status(401).json({
                success: false,
                message: "Not authorized, token failed"
            })
        }
    }
    return res.status(401).json({
        success: false,
        message: "Not authrorized, token failed"
    })
}