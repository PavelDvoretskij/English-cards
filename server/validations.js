import { check } from "express-validator";

export const regValidation = [
  check("userName", "Некорректное имя").isLength({ min: 2 }),
  check("password", "Некорректный пароль").isLength({ min: 5 }),
];

export const loginValidation = [
  check("userName", "Некорректное имя").exists(),
  check("password", "Некорректный пароль").exists(),
];

export const createValidation = [
  check("title", "Некорректное слово").isLength({ min: 2 }),
  check("translation", "Некорректный текст перевода").isLength({ min: 2 }),
];
