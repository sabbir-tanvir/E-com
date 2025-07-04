import express from 'express';
import { deleteUser, getAllUsers, getSingleUserDetails, getUserDEtails, LoginUser,  logout,  registeruser, resetPassword, resetPasswordConfirm, updatePassword, updateProfile, updateUserRole } from '../controller/userController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';

const router = express.Router();

// Test route
router.route("/test").get((req, res) => {
    res.json({ success: true, message: "Server is working!" });
});

router.route("/register").post(registeruser)
router.route("/login").post(LoginUser)
router.route("/logout").post(logout)
router.route("/password/forgot").post(resetPassword)
router.route("/password/reset/:token").post(resetPasswordConfirm)
router.route("/profile").get(verifyUserAuth , getUserDEtails)
router.route("/password/update").post(verifyUserAuth, updatePassword)
router.route("/profile/update").post(verifyUserAuth, updateProfile)
router.route("/admin/users").get(verifyUserAuth, roleBasedAccess("admin"), getAllUsers)
router.route("/admin/user/:id").get(verifyUserAuth, roleBasedAccess("admin"), getSingleUserDetails)
router.route("/admin/user/:id").put(verifyUserAuth, roleBasedAccess("admin"), updateUserRole)

router.route("/admin/user/:id").delete(verifyUserAuth, roleBasedAccess("admin"), deleteUser)


export default router;