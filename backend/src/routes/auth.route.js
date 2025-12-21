import {Router} from "express";


const router= Router();

router.route("/register",registerController);
router.route("/login",loginController);
router.route("/logout",logoutController);
router.route("/refresh",refreshController);
router.route("/verify-email",verifyEmailController);
router.route("/forgot-password",forgotPasswordController);
router.route("/reset-password",resetPasswordController);
router.route("/me",meController);



export default router;