import User from '../models/User';

class UserController {
  async store(req, res) {
    // check if name isn't empty
    if (!req.body.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // check if password isn't empty
    if (!req.body.password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Password rules chequing
    const rgexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!req.body.password.match(rgexPass)) {
      return res.status(400).json({
        error:
          'Your password must have at least 8 characters with at least one Capital letter, at least one lower case letter and at least one number or special character',
      });
    }

    // check if email isn't empty
    if (!req.body.email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // check if email alread exists
    const emailUsed = await User.findOne({ where: { email: req.body.email } });
    if (emailUsed) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const {
      id,
      name,
      email,
      location,
      city,
      province,
      country,
    } = await User.create(req.body);

    return res.json({ id, name, email, location, city, province, country });
  }

  async update(req, res) {
    // check if password isn't empty
    if (!req.body.password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const { email, newPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // check session Time-out
    if (!user) {
      return res.status(440).json({ error: 'Login Time-out' });
    }

    // check if new provided email alread not exists
    if (email && email !== user.email) {
      const emailUsed = await User.findOne({ where: { email } });
      if (emailUsed) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    // if newPassword provided, check current password
    if (newPassword && !(await user.checkPassword(req.body.password))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Password rules chequing
    const rgexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!req.body.password.match(rgexPass)) {
      return res.status(400).json({
        error:
          'Your password must have at least 8 characters with at least one Capital letter, at least one lower case letter and at least one number or special character',
      });
    }
    req.body.password = newPassword;

    const { id, name, location, city, province, country } = await user.update(
      req.body
    );

    return res.json({ id, name, email, location, city, province, country });
  }
}

export default new UserController();
