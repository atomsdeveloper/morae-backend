class HomeController {
  async index(req, res) {
    return res.json({
      success: true,
      message: "Rota acessada com sucesso.",
    });
  }
}

// Exporting the instance of HomeController
// This allows us to use the same instance across the application
export default new HomeController();
