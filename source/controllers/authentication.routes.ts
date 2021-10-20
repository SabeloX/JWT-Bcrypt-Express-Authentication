import { Request, Response } from 'express';
import connectDB from '../databaseUtil';

/**
 * 
 * @param request object
 * @param response object
 * @param next middleware function for error
 * @returns response
 */
export const register = (request: Request, response: Response, next: Function) => {
    connectDB( async database => {
        const user = await database.collection('users').insertOne({
            username: request.body.username,
            password: request.body.password
        });

        response.status(200).send(user);
    });
}