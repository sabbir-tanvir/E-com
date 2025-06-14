import express from 'express';
import { createProduct, deletProduct, getAllProducts, getSingleProduct, updateProduct } from '../controller/productControler.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';

const router = express.Router();

router.route("/products")
    .get(verifyUserAuth, getAllProducts)
    .post(verifyUserAuth, roleBasedAccess("admin"), createProduct);
    

router.route("/product/:id")
    .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
    .delete(verifyUserAuth, roleBasedAccess("admin"), deletProduct)
    .get(verifyUserAuth, getSingleProduct);

export default router;

