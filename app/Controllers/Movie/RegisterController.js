import Movie from '../../Models/movie.js'
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
        description,
        actors,
        directors,
        genre,
        link_video,
        link_picture
      } = req.body;
      const movie = await Movie.create({
        name,
        description,
        actors,
        directors,
        genre,
        link_video,
        link_picture
      });
      return res.status(201).json({
        message: "Movie created",
        movie
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async validate(body) {
    const schema = await Yup.object().shape({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      actors: Yup.string().required("Actors is required"),
      directors: Yup.string().required("Directos is required"),
      genre: Yup.string().required("Genre is required"),
      link_video: Yup.string().required("Link video is required"),
      link_picture: Yup.string().required("Link picture is required")
    });
    return {
      valid: await schema.isValid(body),
      error: await schema.validate(body, {}),
    }
  }
}

export default new RegisterController();