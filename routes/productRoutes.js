import express from 'express';
import { createProduct, getAllProducts } from '../backend/controller/productControler.js';

const router = express.Router();

router.route("/products").get(getAllProducts).post(createProduct)


export default router;