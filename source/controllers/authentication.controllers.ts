import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { connectDB } from '../util.database';

/**
 * Register a new user
 * @param request object
 * @param response object
 * @param next middleware function for error
 * @returns response
 */
export const register = (request: Request, response: Response, next: Function) => {
    const {username, password} = request.body;
    if(username && password){
        connectDB( async (database: Db) => {

            //check if user exists in the database
            const user = await database.collection('users').findOne({ username });

            if(!user){
                const newUser = await database.collection('users').insertOne({ username, password });
                response.status(200).send(newUser);
            }
            response.status(403).send({ message: `User already exists` });
        }, response);
    }
    response.status(400).send({ message: `Cannot submit a blank username/password` });
}

/**
 * Login a user
 * @param request 
 * @param response 
 * @param next 
 */
export const login = (request: Request, response: Response, next: Function) => {
    const {username, password} = request.body;
    if(username && password){
        connectDB( async (database: Db) => {
            //check if user exists in the database
            const user = await database.collection('users').findOne({ username });
            if(!user){
                response.status(401).send({ message: `Incorrect username/password` });
            }
            else{
                if(user.password === password){
                    response.status(200).send(user);
                }
                response.status(401).send({ message: `Incorrect username/password`});
            }

        }, response);
    }
    response.status(400).send({ message: `Cannot submit a blank username/password` });
}