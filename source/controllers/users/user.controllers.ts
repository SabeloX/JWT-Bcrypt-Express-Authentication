import { Request, Response } from 'express';
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