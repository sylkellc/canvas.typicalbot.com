import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// Import environment variables
import dotenv from 'dotenv';

dotenv.config();

import api from './api';

// Setup express
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/api/v1', api);

const port = process.env.PORT || 3000;

// Listen to express
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
