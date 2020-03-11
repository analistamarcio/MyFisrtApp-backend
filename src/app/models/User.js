import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        address: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
