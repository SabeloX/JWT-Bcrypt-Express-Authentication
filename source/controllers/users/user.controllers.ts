import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { connectDB } from '../../util.database';

export const getUsers = async (request: Request, response: Response) => {
    await connectDB( async (database: Db) => {
        const users = await database.collection('users').find();
        console.log(users);
        if(users){
            return response.status(200).send(users);
        }
        return response.status(404).send({ message: "No Users Found"});
    }, response);
}