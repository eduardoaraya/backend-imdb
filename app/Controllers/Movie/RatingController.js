import ClientMovieRating from '../../Models/client-movie-rating.js';
import Movie from '../../Models/movie.js'
import * as Yup from 'yup';

class ListingController {
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
      const { movie_id, rating } = req.body;
      const movie = await Movie.findOne({
        where: {
          id: movie_id,
          is_active: true
        }
      });
      console.log(movie);
      if (!movie) {
        return res.status(404).json({
          message: 'Movie not found'
        })
      }
      const clientRating = await ClientMovieRating.findOne({
        where: {
          client_id: auth.id,
          movie_id: movie.id
        }
      })
      if (!clientRating) {
        await ClientMovieRating.create({
          rating,
          client_id: auth.id,
          movie_id: movie.id
        })
        return res.status(201).json({
          message: 'Your review has been completed'
        });
      }
      await clientRating.update({ rating })
      return res.status(201).json({
        message: 'Your review has been updated'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
  async validate(body) {
    const schema = await Yup.object().shape({
      movie_id: Yup.number().required("Movie Id is required"),
      rating: Yup.number().required("Rating is required")
    });
    return {
      valid: await schema.isValid(body),
      error: await schema.validate(body, {}),
    }
  }
}

export default new ListingController();