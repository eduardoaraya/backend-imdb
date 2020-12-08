export default {
  admin: {
    secret: process.env.JWT_ADMIN_SECRET,
    expiresIn: '1h'
  },
  client: {
    secret: process.env.JWT_CLIENT_SECRET,
    expiresIn: '1d'
  }
}