import express from 'express';
import { createProduct, deletProduct, getAdminProducts, getAllProducts, getSingleProduct, updateProduct } from '../controller/productControler.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';

const router = express.Router();

router.route("/products")
    .get( getAllProducts); 

router.route("/admin/products")
    .get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);

router.route("/admin/product/create")
    .post(verifyUserAuth, roleBasedAccess("admin"), createProduct);
    
router.route("/admin/product/:id")
    .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
    .delete(verifyUserAuth, roleBasedAccess("admin"), deletProduct);

router.route("/product/:id")
    .get( getSingleProduct);

export default router;

