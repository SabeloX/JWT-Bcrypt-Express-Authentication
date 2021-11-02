import express, { json } from 'express';
import cors from 'cors';
import router from './routes';
import mongoose, { mongo } from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
const databaseURL: string = process.env.DATABASE || '';

app.use(json());    // allow server to read JSON format data
app.use(cors());    // enable CORS for all requests

// Routes
app.use('/api/users', router.auth, router.users);

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

mongoose.connect(databaseURL, (error) => {
    if(error) console.log('Cannot Connect to the database');
    else console.log('Connected to the database!');
})

// listen for the server on PORT
app.listen(PORT, () => console.log(`Server Running in http://localhost:${PORT}`));