'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('client_movie_rating',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        client_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'clients',
            key: 'id'
          }
        },
        movie_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'movies',
            key: 'id'
          }
        },
        rating: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('client_movie_rating');
  }
};
