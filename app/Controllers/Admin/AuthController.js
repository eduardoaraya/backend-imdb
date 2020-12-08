import Admin from '../../Models/admin.js'
import AuthenticateService, { Types } from '../../Services/AuthenticateService.js';

class AuthController {
  constructor({ authProvider }) {
    this.authProvider = authProvider;
  }
  async execute(req, res) {
    try {
      const { email, password } = req.body;
      const administrator = await Admin.findOne({
        where: { email }
      });
      if (!administrator) {
        return res.status(401).json({
          message: 'Invalid e-mail'
        });
      }
      const check = await administrator.checkPassword(password);
      if (!check || administrator.validateUnregiser()) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }
      const token = this.authProvider.genToken(administrator);
      return res.status(200).json({
        admin: {
          name: administrator.name,
          email: administrator.email
        },
        token
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new AuthController({
  authProvider: new AuthenticateService(Types.Admin)
});