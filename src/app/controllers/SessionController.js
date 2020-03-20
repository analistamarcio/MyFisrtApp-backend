import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // check if user has informed the email address (login)
    if (!email) {
      return res.status(401).json({ error: 'The email is required' });
    }

    // check if user has informed the password
    if (!password) {
      return res.status(401).json({ error: 'The password is required' });
    }

    const user = await User.findOne({ where: { email } });
    // check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid email/password' });
    }

    // check if email is correct (match)
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Invalid email/password' });
    }

    const { id, name } = user;
    console.log(`id = ${id}`);

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
