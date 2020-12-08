import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AuthenticateService from '../Services/AuthenticateService.js';

export default (provider) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authProvider = new AuthenticateService(provider);
  if (!authHeader) {
    return res.status(401).json({ message: 'token not provider' });
  }
  const [, token] = authHeader.split(' ');
  if (!token) {
    return res.status(401).json({ message: 'token invalid' });
  }
  try {
    const { id } = await promisify(jwt.verify)(token, authProvider.secret);
    const auth = await authProvider.model.findOne({ where: { id } });
    if (auth.validateUnregiser()) {
      return res.status(401).json({ message: 'You canceled your account' });
    }
    req.auth = auth;
    req.token = token;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'token invalid' });
  }
};