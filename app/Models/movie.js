import Sequelize from 'sequelize';
export default class Movie extends Sequelize.Model {
  static init(connection) {
    super.init({
      name: Sequelize.DataTypes.STRING,
      description: Sequelize.DataTypes.TEXT,
      genre: Sequelize.DataTypes.STRING,
      directors: Sequelize.DataTypes.STRING,
      actors: Sequelize.DataTypes.STRING,
      link_video: Sequelize.DataTypes.STRING,
      link_picture: Sequelize.DataTypes.STRING,
      is_active: Sequelize.DataTypes.BOOLEAN,
    }, {
      sequelize: connection,
      modelName: 'Movies',
      tableName: 'movies'
    });
  }
  static associate(models) {
    this.hasMany(models.ClientMovieRating, {
      as: 'ratings',
      foreignKey: 'movie_id'
    })
  }
};