import Register from './register.js';
import { Types } from '../app/Services/AuthenticateService.js';
import authMiddleware from '../app/Middlewares/auth.js';
import RegisterController from '../app/Controllers/Movie/RegisterController.js';
import IndexController from '../app/Controllers/Movie/IndexController.js';
import ListingController from '../app/Controllers/Movie/ListingController.js';
import RatingController from '../app/Controllers/Movie/RatingController.js';

const routers = [
  {
    method: 'post',
    path: 'register',
    handle: (req, res) => RegisterController.execute(req, res),
    middlewares: [
      authMiddleware(Types.Admin)
    ]
  },
  {
    method: 'post',
    path: 'rating',
    handle: (req, res) => RatingController.execute(req, res),
    middlewares: [
      authMiddleware(Types.Client)
    ]
  },
  {
    method: 'get',
    path: 'listing',
    handle: (req, res) => ListingController.execute(req, res),
  },
  {
    method: 'get',
    path: 'movie/:id',
    handle: (req, res) => IndexController.execute(req, res),
  }
];

export default new Register({
  prefix: '/movies',
  routers
});