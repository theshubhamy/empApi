import express from "express";

import { body } from "express-validator";
// auth ROutes
import { UserLogin } from "../controllers/authentication/user-login.js";
import { UserSignup } from "../controllers/authentication/user-signup.js";
import { getAllUsers } from "../controllers/user/get-all-users.js";
import { isUser } from "../middleware/is-user.js";
const router = express.Router();

//USER SIGNUP USING PHONE
router.post("/signup", UserSignup);

//USER LOGIN USING EMAIL + PASSWORD
router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  UserLogin
);
router.get(
  "/userdetails",
  isUser,

  getAllUsers
);

export default router;
