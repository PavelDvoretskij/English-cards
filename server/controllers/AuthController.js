import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при регистрации",
      });
    }

    const { userName, password: passwordHash } = req.body;

    const isUsed = await User.findOne({ userName });

    if (isUsed) {
      return res.status(300).json({
        message: "Данный username занят",
      });
    }

    const salt = await bcrypt.genSaltSync(7);
    const hash = await bcrypt.hashSync(passwordHash, salt);

    const newUser = new User({
      userName,
      password: hash,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const { password, ...userData } = newUser._doc;

    res.status(201).json({
      ...userData,
      token,
      message: "Регистрация прошла успешно",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при создании пользователя",
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { userName, password: passwordHash } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({
        message: "Введены неверные данные",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(passwordHash, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Введены неверные данные",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const { password, ...userData } = user._doc;
    res.status(200).json({
      ...userData,
      token,
      message: "Вы вошли в систему",
    });
  } catch (error) {
    res.status(400).json({
      message: "Ошибка авторизации",
    });
  }
};
