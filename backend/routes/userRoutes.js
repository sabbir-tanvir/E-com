import express from 'express';
import { getUserDEtails, LoginUser,  logout,  registeruser, resetPassword, resetPasswordConfirm, updatePassword, updateProfile } from '../controller/userController.js';
import { verifyUserAuth } from '../middleware/userAuth.js';

const router = express.Router();

router.route("/register").post(registeruser)
router.route("/login").post(LoginUser)
router.route("/logout").post(logout)
router.route("/password/forgot").post(resetPassword)
router.route("/password/reset/:token").post(resetPasswordConfirm)
router.route("/profile").post(verifyUserAuth , getUserDEtails)
router.route("/password/update").post(verifyUserAuth, updatePassword)
router.route("/profile/update").post(verifyUserAuth, updateProfile)

export default router;