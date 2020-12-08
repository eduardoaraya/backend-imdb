import Movie from '../../Models/movie.js'
import Sequelize from 'sequelize';

class ListingController {
  async execute(req, res) {
    try {
      const { directors, name, genre, actors } = req.query;
      const result = await Movie.findAll({
        where: {
          is_active: true,
          [Sequelize.Op.or]: {
            directors: {
              [Sequelize.Op.like]: `%${directors}%`
            },
            name: {
              [Sequelize.Op.like]: `%${name}%`
            },
            genre: {
              [Sequelize.Op.like]: `%${genre}%`
            },
            actors: {
              [Sequelize.Op.like]: `%${actors}%`
            }
          }
        }
      });
      return res.status(200).json({
        result,
        total: result.length ?? 0
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new ListingController();