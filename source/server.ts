import express, { json } from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());    // allow server to read JSON format data
app.use(cors());    // enable CORS for all requests

// Routes
app.use('/api/users', router.auth);

// listen for the server on PORT
app.listen(PORT, () => console.log(`Server Running in http://localhost:${PORT}`));