import jwt from "jsonwebtoken";
import User from "../models/User.js";

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          success: false,
          message: "Email e senha são obrigatórios.",
        });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          success: false,
          message: "Senha incorreta.",
        });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        }
      );

      return res.json({
        success: true,
        message: "Token gerado com sucesso.",
        data: {
          token: token,
          name: user.name,
          email: user.email,
          id: user.id,
          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.errors
          ? error.errors.map((err) => err.message)
          : [error.message],
      });
    }
  }
}

export default new TokenController();
