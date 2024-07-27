import {Router} from "express";
import {registerUser,loginUser,logoutUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();

router.route("/register").post(upload.single("profilePic"),registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)

export default router;