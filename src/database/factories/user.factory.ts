import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.username = `user_${faker.name.firstName()}`;
  user.password =
    '$2b$10$mNLDgtL7vM5v8Eip9DfPpOHUOF7a5XKGRYkJWd3/bsAU7NXLsFs/G'; // password;

  return user;
});
