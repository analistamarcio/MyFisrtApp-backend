import User from '../models/User';

class UserController {
  async store(req, res) {
    /**
     * check if name isn't empty
     */

    /**
     * test for password rules
     */

    // check if email alread exists
    const emailUsed = await User.findOne({
      where: { email_hash: req.body.email },
    });
    if (emailUsed) {
      return res.status(400).json({ error: 'Email already used' });
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
}

export default new UserController();
