import { Router } from "express";
import { register, login } from "../controllers/AuthController.js";
import { loginValidation, regValidation } from "../validations.js";
import validationErrors from "../utils/validationErrors.js";

const router = new Router();

// Register
//http://localhost:3002/api/auth/register
router.post("/register", regValidation, validationErrors, register);

// Login
//http://localhost:3002/api/auth/login
router.post("/login", loginValidation, validationErrors, login);

export default router;
