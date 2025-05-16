// Models
import Reserves from "../models/Reserves";
import User from "../models/User";
import Photo from "../models/Photo";

class PhotoController {
  async store(req, res) {
    console.log(req.file);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Nenhum arquivo enviado." });
    }

    const { user_id, reserve_id } = req.body;

    if (!user_id && !reserve_id) {
      return res.status(400).json({
        success: false,
        message: "Você deve fornecer 'user_id' ou 'reserve_id'.",
      });
    }

    try {
      const isCloudinary = process.env.STORAGE_DRIVER === "cloudinary";
      const { filename, originalname, path } = req.file;

      if (user_id) {
        if (parseInt(user_id) !== req.user.id) {
          return res.status(403).json({
            success: false,
            message:
              "Você não tem permissão para alterar a foto de outro usuário.",
          });
        }

        const user = await User.findByPk(user_id, {
          attributes: {
            exclude: ["originalname", "created_at", "updated_at", "id"],
          },
        });
        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "Usuário não encontrado." });
        }

        const photo = await Photo.create({
          filename: isCloudinary ? path : filename, // `path` é a URL no Cloudinary
          originalname,
          user_id,
        });

        return res.json({
          success: true,
          message: "Rota acessada com sucesso.",
          file: photo,
        });
      }

      // Upload de foto de reserva (admin)
      if (reserve_id) {
        if (req.user.role !== "admin") {
          return res.status(403).json({
            success: false,
            message: "Apenas administradores podem enviar fotos para reservas.",
          });
        }

        const reserve = await Reserves.findByPk(reserve_id, {
          attributes: {
            exclude: ["originalname", "created_at", "updated_at", "id"],
          },
        });
        if (!reserve) {
          return res
            .status(400)
            .json({ success: false, message: "Reserva não encontrada." });
        }

        const photo = await Photo.create({
          filename: isCloudinary ? path : filename,
          originalname,
          reserve_id,
        });

        return res.json({
          success: true,
          message: "Foto da reserva enviada com sucesso.",
          file: photo,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao acessar a rota de upload.",
        error: error.errors
          ? error.errors.map((err) => err.message)
          : error.message,
      });
    }
  }
}

export default new PhotoController();
