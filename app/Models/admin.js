import Sequelize from 'sequelize';
import bcrypt from 'bcrypt'
export default class Admin extends Sequelize.Model {
  static init(connection) {
    super.init({
      name: Sequelize.DataTypes.STRING,
      email: Sequelize.DataTypes.STRING,
      password: {
        type: Sequelize.DataTypes.STRING
      },
      is_active: Sequelize.DataTypes.BOOLEAN,
      deletedAt: Sequelize.DataTypes.DATE
    }, {
      sequelize: connection,
      modelName: 'Admin',
      tableName: 'admins'
    })
    this.addHook('beforeSave', async (entity) => {
      if (entity.password) {
        entity.password = await bcrypt.hash(entity.password, 10);
      }
    })
  }
  static associate() {
  }
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
  validateUnregiser() {
    return this.deletedAt !== null;
  }
};