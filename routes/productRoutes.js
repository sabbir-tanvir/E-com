import express from 'express';
import { createProduct, deletProduct, getAllProducts, getSingleProduct, updateProduct } from '../backend/controller/productControler.js';
import { verifyUserAuth } from '../backend/middleware/userAuth.js';
 
const router = express.Router();

router.route("/products").get(verifyUserAuth,getAllProducts).post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deletProduct).get(getSingleProduct);

export default router;
