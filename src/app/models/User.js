import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.VIRTUAL,
        name_hash: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        location: Sequelize.STRING,
        city: Sequelize.STRING,
        province: Sequelize.STRING,
        country: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // encrypt name and password
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }

      if (user.name) {
        user.name_hash = await bcrypt.hash(user.name, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
