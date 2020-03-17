import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        passwordPlainText: Sequelize.VIRTUAL,
        password: Sequelize.STRING,
        location: Sequelize.STRING,
        city: Sequelize.STRING,
        province: Sequelize.STRING,
        country: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // encrypt password
    this.addHook('beforeSave', async user => {
      console.log(user.passwordPlainText);
      if (user.passwordPlainText) {
        user.password = await bcrypt.hash(user.passwordPlainText, 8);
      }
    });

    return this;
  }

  checkPassword(passwordPlainText) {
    return bcrypt.compare(passwordPlainText, this.password);
  }
}

export default User;
