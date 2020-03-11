import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Marcio Ferreira',
    email: 'analistamarcio@hotmail.com',
    password_hash: '123456',
    city: 'Vancouver',
    province: 'BC',
    country: 'Canada',
  });

  return res.json(user);
});

export default routes;
