import Register from './register.js';
import AuthController from '../app/Controllers/Admin/AuthController.js';
import RegisterController from '../app/Controllers/Admin/RegisterController.js';
import UnregisterController from '../app/Controllers/Admin/UnregisterController.js';
import UpdateController from '../app/Controllers/Admin/UpdateController.js';

import { Types } from '../app/Services/AuthenticateService.js';
import authMiddleware from '../app/Middlewares/auth.js';

const routers = [
  {
    path: 'auth',
    method: 'post',
    handle: (req, res) => AuthController.execute(req, res)
  },
  {
    path: 'register',
    method: 'post',
    handle: (req, res) => RegisterController.execute(req, res)
  },
  {
    path: 'edit',
    method: 'put',
    handle: (req, res) => UpdateController.execute(req, res),
    middlewares: [
      authMiddleware(Types.Admin)
    ]
  },
  {
    path: 'unregister',
    method: 'put',
    handle: (req, res) => UnregisterController.execute(req, res),
    middlewares: [
      authMiddleware(Types.Admin)
    ]
  },
];

export default new Register({
  prefix: '/admin',
  routers
});