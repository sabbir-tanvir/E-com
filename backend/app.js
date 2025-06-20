import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import errorHaldelMiddlewire from './middleware/error.js';

import cookieParser from 'cookie-parser';
const app = express();



//Middlewire
app.use(express.json())
app.use(cookieParser());


//Route
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(errorHaldelMiddlewire)

export default app;
