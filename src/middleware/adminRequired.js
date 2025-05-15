import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token é requerido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifique a validade do token
    req.user = decoded; // Adiciona o usuário ao request

    // Verifique se o usuário é ADMIN
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "você não tem permisão para acessar essa página" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};
