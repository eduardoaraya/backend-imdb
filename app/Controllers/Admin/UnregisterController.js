import Admin from '../../Models/admin.js'

class UnregisterController {
  async execute(req, res) {
    try {
      const { auth } = req;
      const admin = await Admin.findByPk(auth.id);
      if (!admin.id) {
        return res.status(400).json({ error: "Admin is invalid" });
      }
      admin.update({
        deletedAt: new Date(),
        email: admin.email + new Date().getTime(),
        is_active: false
      });
      return res.status(200).json({
        message: "Success. You canceled your account!"
      })
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new UnregisterController();