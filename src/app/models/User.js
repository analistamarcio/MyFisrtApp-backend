import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.VIRTUAL,
        name_hash: Sequelize.STRING,
        email: Sequelize.VIRTUAL,
        email_hash: Sequelize.STRING,
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

    // encrypt name, email and password
    this.addHook('beforeSave', async user => {
      if (user.name) {
        user.name_hash = await bcrypt.hash(user.name, 8);
      }

      if (user.email) {
        user.email_hash = await bcrypt.hash(user.email, 8);
      }

      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;
