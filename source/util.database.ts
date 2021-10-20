import { MongoClient, Db } from 'mongodb';
import { Response } from 'express';

const databaseURL : string = process.env.DATABASE || 'mongodb://localhost:27017';

/**
 * Connect to the database
 * @param operation function for operating CRUD
 * @param response object
 */
export const connectDB = async (operation: Function, response: Response) => {
    try{
        const client = await MongoClient.connect(databaseURL);
        const database: Db = client.db('secure_api');

        //Begin CRUD operation
        operation(database);

        // Close database connection
        client.close();
    }
    catch(error){
        response.status(500).send({ message: `Error while connecting to the database.\n ${error}`});
    }
}