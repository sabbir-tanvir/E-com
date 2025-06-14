import express from 'express';
import { LoginUser,  logout,  registeruser } from '../controller/userController.js';

const router = express.Router();

router.route("/register").post(registeruser)
router.route("/login").post(LoginUser)
router.route("/logout").post(logout)

export default router;