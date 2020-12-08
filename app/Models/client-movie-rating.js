import Sequelize from 'sequelize';
import Client from './client.js';
import Movie from './movie.js';

export default class ClientMovieRating extends Sequelize.Model {
  static init(connection) {
    super.init({
      client_id: Sequelize.DataTypes.INTEGER,
      movie_id: Sequelize.DataTypes.INTEGER,
      rating: Sequelize.DataTypes.INTEGER,
    }, {
      sequelize: connection,
      modelName: 'ClientMovieRating',
      tableName: 'client_movie_rating'
    })
  }
  static associate(models) {
    this.belongsTo(models.Client, {
      as: 'client',
      foreignKey: 'id'
    });
    this.belongsTo(models.Movies, {
      as: 'movie',
      foreignKey: 'id'
    });
  }
};