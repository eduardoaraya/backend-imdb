import Client from '../../Models/client.js'

class UnregisterController {
  async execute(req, res) {
    try {
      const { auth } = req;
      const client = await Client.findByPk(auth.id);
      if (!client.id) {
        return res.status(400).json({ error: "Client is invalid" });
      }
      client.update({
        deletedAt: new Date(),
        email: client.email + new Date().getTime(),
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