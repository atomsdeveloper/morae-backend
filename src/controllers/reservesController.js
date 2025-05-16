import User from "../models/User.js";
import Reserves from "../models/Reserves.js";
import Photo from "../models/Photo.js";

class ReservesController {
  async index(req, res) {
    try {
      const reserves = await Reserves.findAll({
        include: [
          {
            model: User,
            as: "users",
            attributes: {
              exclude: ["password_hash", "created_at", "updated_at", "id"],
            },
            include: [
              {
                model: Photo,
                as: "photos", // Certifique-se que o 'as' seja exatamente esse na associação em Reserves
                attributes: ["id", "filename", "originalname"],
              },
            ],
            through: { attributes: [] },
          },
          {
            model: Photo,
            as: "photos", // ou "photo" se for hasOne
            attributes: ["id", "filename", "originalname"], // escolha os campos que deseja
          },
        ],
      });

      return res.json({
        success: true,
        message: "Lista de reservas.",
        data: reserves,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Erro ao listar os reservas.",
        error: error.errors
          ? error.errors.map((err) => err.message)
          : [error.message],
      });
    }
  }

  async store(req, res) {
    try {
      const reserves = await Reserves.create(req.body);

      if (!reserves) {
        return res.status(400).json({
          success: false,
          message: "Dados da reserva não existem.",
        });
      }

      const { name, country, city, description, rooms, type, price } = req.body;

      return res.json({
        success: true,
        message: "Reserva criada com sucesso.",
        data: {
          name,
          country,
          city,
          description,
          rooms,
          type,
          price,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Erro ao criar a reserva.",
        error: error.errors
          ? error.errors.map((err) => err.message)
          : [error.message],
      });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Id da reserva não informado.",
        });
      }

      const reserves = await Reserves.findByPk(req.params.id, {
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        include: [
          {
            model: User,
            as: "users",
            attributes: {
              exclude: ["password_hash", "created_at", "updated_at", "id"],
            },
            through: { attributes: [] },
            include: [
              {
                model: Photo,
                as: "photos", // Certifique-se que o 'as' seja exatamente esse na associação em Reserves
                attributes: ["id", "filename", "originalname"],
              },
            ],
          },
          {
            model: Photo,
            as: "photos", // ou "photo" se for hasOne
            attributes: ["id", "filename", "originalname"], // escolha os campos que deseja
          },
        ],
      });

      if (!reserves) {
        return res.status(404).json({
          success: false,
          message: "Reserva não encontrada.",
        });
      }

      return res.json({
        success: true,
        message: "Reserva encontrada.",
        data: {
          reserves,
        }, // Returning only the name and email of the created user
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao buscar a reserva.",
        error: error.errors
          ? error.errors.map((err) => err.message)
          : [error.message],
      });
    }
  }

  async update(req, res) {
    try {
      if (req.user.id !== req.params.id && req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Você não tem permissão para atualizar a reserva.",
        });
      }

      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Id da reserva não informado.",
        });
      }

      const reserves = await Reserves.findByPk(req.params.id, {
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });

      if (!reserves) {
        return res.status(404).json({
          success: false,
          message: "Reserva não encontrada.",
        });
      }

      await reserves.update(req.body);

      return res.json({
        success: true,
        message: "Reserva atualizada com sucesso.",
        data: {
          reserves,
        },
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao atualizar a reserva.",
        error: error.errors
          ? error.errors.map((err) => err.message)
          : [error.message],
      });
    }
  }

  async delete(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Você não tem permissão para deletar a reserva.",
        });
      }
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Id da reserva não informada.",
        });
      }

      const reserves = await Reserves.findByPk(req.params.id);

      if (!reserves) {
        return res.status(404).json({
          success: false,
          message: "Reserva não encontrada.",
        });
      }

      await reserves.destroy();

      return res.json({
        success: true,
        message: "Reserva deletada com sucesso.",
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao deletar a reserva.",
        error: error.errors
          ? error.errors.map((err) => err.message)
          : [error.message],
      });
    }
  }
}

export default new ReservesController();
