import jwt from 'jsonwebtoken';

export const createJWT = ({payload}) => jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5h'});

export const verifyJWT = ({token}) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

export const attachCookieToResponse = (context, {user}) =>{
    console.log('tok')
    const token = createJWT({payload: user});
    context.res.cookie('token', token, {
        httpOnly: true, 
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "none",
        maxAge: 18000000 // 
    } )
   return token;
}