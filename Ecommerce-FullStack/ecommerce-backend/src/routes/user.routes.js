import {Router} from "express";
import {registerUser,loginUser,logoutUser, currentUser, getAllusers} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/register").post(upload.single("profilePic"),registerUser);
router.route("/login").post(loginUser)
router.route("/user-details").get(verifyJWT,currentUser);
router.route("/logout").get(logoutUser)
router.route("/getAllusers").get(verifyJWT,getAllusers);

export default router;