import Client from '../../Models/client.js'
import AuthenticateService, { Types } from '../../Services/AuthenticateService.js';

class AuthController {
  constructor({ authProvider }) {
    console.log("initialized")
    this.authProvider = authProvider;
  }
  async execute(req, res) {
    try {
      const { email, password } = req.body;
      const client = await Client.findOne({
        where: { email }
      });
      if (!client) {
        return res.status(401).json({
          message: 'Invalid e-mail'
        });
      }
      const check = await client.checkPassword(password);
      if (!check || client.validateUnregiser()) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }
      const token = this.authProvider.genToken(client);
      return res.status(200).json({
        client: {
          name: client.name,
          email: client.email
        },
        token
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new AuthController({
  authProvider: new AuthenticateService(Types.Client)
});