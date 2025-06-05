import express from 'express';
import product from '../routes/productRoutes.js';
import errorHaldelMiddlewire from './middleware/error.js';
const app = express();



//Middlewire
app.use(express.json())


//Route
app.use("/api/v1", product);
app.use(errorHaldelMiddlewire)

export default app;
