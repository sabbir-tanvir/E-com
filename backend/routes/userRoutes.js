import express from 'express';
import { LoginUser,  logout,  registeruser, resetPassword } from '../controller/userController.js';

const router = express.Router();

router.route("/register").post(registeruser)
router.route("/login").post(LoginUser)
router.route("/logout").post(logout)
router.route("/password/forgot").post(resetPassword)

export default router;