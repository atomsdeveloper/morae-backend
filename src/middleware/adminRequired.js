import dotenv from "dotenv";
dotenv.config();

export default (req, res, next) => {
  try {
    // Verifique se o usuário é ADMIN
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "você não tem permisão para acessar essa página" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};
