import express from 'express';
import { getCurrentUserAuthData, loginUser, registerUser } from '../controllers/user.controller';
import verifyUserAuth from '../middlewares/verifyUserAuth';

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current-user").get(verifyUserAuth, getCurrentUserAuthData);

export default router;