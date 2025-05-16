import User from "../models/User.js";
import Reserves from "../models/Reserves.js";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password_hash"] },
        include: [
          {
            model: Reserves,
            as: "reserves",
            through: { attributes: [] },
          },
        ],
      });

      return res.json({
        success: true,
        message: "Lista de usuários.",
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Erro ao listar os usuários.",
        error: error.errors
          ? error.errors.map((err) => err.message)
          : [error.message],
      });
    }
  }

  async store(req, res) {
    try {
      const user = await User.create(req.body);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Dados do usuário não existem.",
        });
      }

      return res.json({
        success: true,
        message: "criado com sucesso.",
        data: {
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Erro ao criar o usuário.",
        error: error.errors
          ? error.errors.map((err) => err.message)
          : [error.message],
      });
    }
  }

  async show(req, res) {
    try {
      // This method handles the show route
      // It retrieves a user by its ID from the database

      // It checks if the ID is provided in the URL
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "ID do usuário não informado.",
        });
      }

      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ["password_hash", "created_at", "updated_at", "id"],
        },
        include: [
          {
            model: Reserves,
            as: "reserves",
            through: { attributes: [] },
          },
        ],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      return res.json({
        success: true,
        message: "Usuário encontrado.",
        data: {
          user,
        }, // Returning only the name and email of the created user
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao buscar o usuário.",
        error: error.errors.map((err) => err.message), // Extracting error messages from the Sequelize validation errors.
      });
    }
  }

  async update(req, res) {
    try {
      if (req.user.id !== req.params.id && req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Você não tem permissão para atualizar o usuário.",
        });
      }

      if (!req.user.id) {
        return res.status(400).json({
          success: false,
          message: "ID do usuário não informado.",
        });
      }

      const user = await User.findByPk(req.user.id, {
        attributes: ["id", "name", "email", "role"],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      await user.update(req.body);

      return res.json({
        success: true,
        message: "Usuário atualizado com sucesso.",
        data: {
          user,
        },
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao atualizar o usuário.",
        error: error.errors.map((err) => err.message), // Extracting error messages from the Sequelize validation errors.
      });
    }
  }

  async delete(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Você não tem permissão para deletar o usuário.",
        });
      }
      if (!req.user.id) {
        return res.status(400).json({
          success: false,
          message: "ID do usuário não informado.",
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      await user.destroy();

      return res.json({
        success: true,
        message: "Usuário deletado com sucesso.",
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao deletar o usuário.",
        error: error.errors.map((err) => err.message), // Extracting error messages from the Sequelize validation errors.
      });
    }
  }
}

export default new UserController();
