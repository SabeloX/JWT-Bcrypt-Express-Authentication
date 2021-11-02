import { Request, Response } from 'express';
import database from '../models';

const { User } = database;

/**
 * Get all users
 * @param request 
 * @param response 
 */
export const getUsers = async (request: Request, response: Response) => {
    try{
        const users = await User.find();
        return response.status(200).json(users);
    }
    catch(error){
        return response.status(500).json({ message: "Internal Server Error!" });
    }
}

/**
 * Get a user
 * @param request 
 * @param response 
 */
export const getUser = async (request: Request, response: Response) =>{
    try{
        const username = request.params.username;

        if(!username){
            return response.status(400).json({ message: "Username Required!" });
        }
        const user = await User.findOne({ username });

        if(!user){
            return response.status(404).json({ message: "User not found!" });
        }
        return response.status(200).json(user);
    }
    catch(error){
        return response.status(500).json({ message: "Internal Server Error!" });
    }
}