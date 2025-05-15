import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

export default (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the authorization header is present
  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Token não informado.",
    });
  }

  // Check if the token is in the correct format
  const [text, token] = authorization.split(" ");

  try {
    // Check if the token is in the correct format
    if (text !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Token inválido.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = User.findOne({
      where: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      },
      attributes: ["id", "name", "email"],
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuário inválido.",
      });
    }

    // Attach the user information to the request object
    req.userId = decoded.id;
    req.userName = decoded.name;
    req.userEmail = decoded.email;

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido ou expirado.",
    });
  }
};
