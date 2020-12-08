import Client from '../../Models/client.js'
import Sequelize from 'sequelize';
import * as Yup from 'yup';

class UpdateController {
  async execute(req, res) {
    try {
      const validation = await this.validate(req.body);
      if (!validation.valid) {
        return res.status(422).json({
          message: 'Fill in the fields correctly',
          validation,
        });
      }
      const { auth } = req;
      const { email, name } = req.body;
      const client = await Client.findByPk(auth.id);
      const checkIfEmailexist = await Client.findOne({
        where: {
          email: {
            [Sequelize.Op.eq]: email
          },
          id: {
            [Sequelize.Op.ne]: client.id
          }
        }
      });
      if (checkIfEmailexist) {
        return res.status(400).json({
          message: "Already have an client with this email registered."
        })
      }
      await client.update({
        name,
        email
      });
      return res.status(200).json({
        message: "Success. You updated your account!"
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
  async validate(body) {
    const schema = await Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("E-mail is required")
    });
    return {
      valid: await schema.isValid(body),
      error: await schema.validate(body, {}),
    }
  }
}

export default new UpdateController();