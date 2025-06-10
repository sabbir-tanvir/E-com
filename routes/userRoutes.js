import express from 'express';
import { LoginUser, registeruser } from '../backend/controller/userController.js';

const router = express.Router();

router.route("/register").post(registeruser)
router.route("/login").post(LoginUser)

export default router;