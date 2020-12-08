import Sequelize from 'sequelize';
import config from '../config/db-config.cjs'

const env = process.env.NODE_ENV || 'development';
class Connect {
  constructor() {
    const config = this.getConfig();
    this.__connection = new Sequelize(
      config.database,
      config.username,
      config.password,
      config,
    );
  }
  getConfig() {
    return config[env];
  }
  getConnection() {
    return this.__connection;
  }
}

export default new Connect();