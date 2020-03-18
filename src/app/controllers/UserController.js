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

    // check if email isn't empty
    if (!req.body.email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    /**
     * test for password rules (code pending)
     */

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
    console.log(req.userId);

    return res.json({ ok: true });
  }
}

export default new UserController();
