import express from 'express';
import { verifyJWT } from '../utils/jwt.js';
import { verify } from 'crypto';


const Router = express.Router();

Router.get('/check-cookie', (req, res) => {


    if (req.cookies.token) {
        const {token} = req.cookies;
       const {username, email, uid} =  verifyJWT({token});

        const data = {username, email, uid};
        res.status(200).json({ message: "cookie present", userData: {username, email, uid} })
    }
    else {
        res.json({ message: "No cookie found" });
    }
})

Router.get('/logout', (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,  // Ensure this matches the original cookie settings
            sameSite: "none",
            path: "/" // Ensure the path matches how it was set
        });
        
        return res.status(200).json({ "message": "Cookies cleared successfully" });
        
    } catch (error) {
        console.error("Error clearing cookie:", error);
        res.status(500).json({ "message": "Error clearing cookie" });
    }
})

export {Router};
