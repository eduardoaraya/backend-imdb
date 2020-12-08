import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt-config.js';
import Admin from '../Models/admin.js';
import Client from '../Models/client.js';

export const Types = {
  Admin: 'admin',
  Client: 'client'
}

export default class AuthenticateService {
  constructor(entity) {
    return this.handle()[entity]
  }
  handle() {
    return {
      [Types['Admin']]: {
        model: Admin,
        genToken: ({ id, email }) => {
          return jwt.sign({ id, email, type: Types['Admin'] }, jwtConfig[Types['Admin']].secret, {
            expiresIn: jwtConfig[Types['Admin']].expiresIn
          });
        },
        secret: jwtConfig[Types['Admin']].secret
      },
      [Types['Client']]: {
        model: Client,
        genToken: ({ id, email }) => {
          return jwt.sign({ id, email, type: Types['Client'] }, jwtConfig[Types['Client']].secret, {
            expiresIn: jwtConfig[Types['Client']].expiresIn
          });
        },
        secret: jwtConfig[Types['Client']].secret
      }
    }
  }
}