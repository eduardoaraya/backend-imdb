import Connect from './connect.js';
import Admin from '../app/Models/admin.js';
import Client from '../app/Models/client.js';
import Movie from '../app/Models/movie.js';
import ClientMovieRating from '../app/Models/client-movie-rating.js';

const Models = [
  Admin,
  Client,
  Movie,
  ClientMovieRating
];

Models.forEach(model => {
  model.init(Connect.getConnection());
});
Models.forEach(model => {
  model.associate(Connect.getConnection().models);
});

export default Connect;