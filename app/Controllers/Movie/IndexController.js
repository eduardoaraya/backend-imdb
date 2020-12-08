import ClientMovieRating from '../../Models/client-movie-rating.js';
import Movie from '../../Models/movie.js'

class IndexController {
  async execute(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movie.findOne({
        where: {
          id: id,
          is_active: true
        },
        include: ['ratings']
      });
      if (!movie) {
        return res.status(404).json({
          message: "Movie not found."
        });
      }
      const process_rating = await movie.ratings.reduce((reducer, rating) => {
        return reducer += rating.rating;
      }, 0);
      return res.status(200).json({
        movie,
        process_rating: (process_rating / movie.ratings.length) / 5
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}

export default new IndexController();