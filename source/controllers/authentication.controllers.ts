import { Request, Response } from 'express';
import database from '../models';
import bcrypt from 'bcrypt';

const { User } = database;

/**
 * Register a new user
 * @param request object
 * @param response object
 * @param next middleware function for error
 * @returns response
 */
export const register = async (request: Request, response: Response) => {
    try{
        const { username, password } = request.body;
        const user = new User({ username, password });
        user.save()
        .then( async (userDoc) => {
            const salt = await bcrypt.genSalt(10);
            const encrypedPassword = await bcrypt.hash(password, salt);
            user.password = encrypedPassword;
            user.save()
            .then(userDoc => {
                return response.status(201).json(userDoc);
            })
        })
        .catch(error => {
            if(error.code === 11000) return response.status(403).json({ message: "User already exists!" });
            return response.status(400).json({ message: "At least 6 username/password characters required!", error });
        })
    }
    catch(error){
        return response.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

/**
 * Login a user
 * @param request 
 * @param response 
 * @param next 
 */
export const login = async (request: Request, response: Response) => {
    try{
        const {username, password} = request.body;
        if(username.length === 0 || password.length === 0){
            return response.status(400).json({ message: "Username/password Required!" })
        }
        const user = await User.findOne({ username });

        if(!user) return response.status(404).json({ message: 'User not found!', status: 404 });

        const matched = await bcrypt.compare(password, user.password)
        if(!matched){
            return response.status(403).json({ message: "Access Denied!" });
        }
        return response.status(201).json(user);
    }
    catch(error){
        return response.status(500).json({ message: "Internal Server Error!" });
    }
}