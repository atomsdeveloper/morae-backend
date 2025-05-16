import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Token não informado.",
    });
  }

  const [text, token] = authorization.split(" ");

  if (text !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Token inválido.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuário inválido.",
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido ou expirado.",
      error: error.errors
        ? error.errors.map((err) => err.message)
        : [error.message],
    });
  }
};
