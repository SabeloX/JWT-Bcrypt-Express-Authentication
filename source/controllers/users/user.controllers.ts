import { request, Request, Response } from 'express';
import { Db } from 'mongodb';
import { connectDB } from '../../util.database';

/**
 * Get all users
 * @param request 
 * @param response 
 */
export const getUsers = async (request: Request, response: Response) => {
    await connectDB( async (database: Db) => {
        const usersSnapshot = database.collection('users').find();
        const userDocuments = await usersSnapshot.toArray();
        return response.status(200).json(userDocuments);
    }, response);
}

/**
 * Get a user
 * @param request 
 * @param response 
 */
export const getUser = async (request: Request, response: Response) =>{
    await connectDB( async (database: Db) =>{
        const user = await database.collection('users').findOne({ username: request.params.username });
        if(!user){
            return response.status(404).json({error: "Incorrenct Username"});
        }
        return response.status(200).json(user);
    }, response);
}