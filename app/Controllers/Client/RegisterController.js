import Client from '../../Models/client.js'
import AuthenticateService, { Types } from '../../Services/AuthenticateService.js';
import * as Yup from 'yup';

class RegisterController {
  async execute(req, res) {
    try {
      const validation = await this.validate(req.body);
      if (!validation.valid) {
        return res.status(422).json({
          message: 'Fill in the fields correctly',
          validation,
        });
      }
      const {
        name,
        email,
        password
      } = req.body;
      const checkIfEmailexist = await Client.findOne({ where: { email } });
      if (checkIfEmailexist) {
        return res.status(400).json({
          message: "Already have an client with this email registered."
        })
      }
      const user = await Client.create({
        name,
        email,
        password
      });
      const token = new AuthenticateService(Types.Client).genToken(user);
      return res.status(201).json({
        message: "Success creating your acount " + user.email,
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
  async validate(body) {
    const schema = await Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("E-mail is required"),
      password: Yup.string().min(6).required("Password is required")
    });
    return {
      valid: await schema.isValid(body),
      error: await schema.validate(body, {}),
    }
  }
}

export default new RegisterController();