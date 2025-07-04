import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import errorHaldelMiddlewire from './middleware/error.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import cookieParser from 'cookie-parser';
const app = express();



//Middlewire
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Support both frontend ports
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(fileUpload());


//Route
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(errorHaldelMiddlewire)

export default app;
