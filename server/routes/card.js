import { Router } from "express";
import {
  create,
  getAll,
  update,
  remove,
  memorize,
} from "../controllers/CardController.js";
import { checkAuth } from "../utils/checkAuth.js";
import { createValidation } from "../validations.js";
import validationErrors from "../utils/validationErrors.js";

const router = new Router();

// Create
//http://localhost:3002/cards
router.post("/", checkAuth, createValidation, validationErrors, create);

// Get all
//http://localhost:3002/cards
router.get("/", checkAuth, getAll);

// Update
//http://localhost:3002/cards
router.patch("/", checkAuth, createValidation, validationErrors, update);

// Remove
//http://localhost:3002/cards
router.delete("/", checkAuth, remove);

//http://localhost:3002/cards/memorize
router.patch("/memorize", memorize);

export default router;
