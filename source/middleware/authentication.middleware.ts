import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Verify Access Token
 * @param request 
 * @param response 
 * @param next 
 * @returns response
 */
export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers['authorization']?.split(' ')[1];

    if(!token){
        return response.status(403).json({ message: "Not Authorized!" });
    }
    JWT.verify(token, process.env.TOKEN_SECRET as string, (error, decoded) => {
        if(error){
            return response.status(403).json({ message: "Invalid Token!" });
        }
        console.log(decoded);
        next();
    });
}