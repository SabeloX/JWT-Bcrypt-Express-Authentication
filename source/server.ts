import express, { json } from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE || 'mongodb://localhost:27017';

app.use(json());    // allow server to read JSON format data
app.use(cors());    // enable CORS for all requests

// Routes
app.use('/api/users', router.auth);

// Connect to the database
MongoClient.connect(databaseURL, (error, database) => {
    if(error){
        console.log(`Cannot connect to the database: \n${error.message}`);
    }
    console.log(`Successfully connected to the database.`);
});

// listen for the server on PORT
app.listen(PORT, () => console.log(`Server Running in http://localhost:${PORT}`));