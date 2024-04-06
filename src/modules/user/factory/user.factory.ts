import { randEmail, randFullName, randPassword, randUuid } from '@ngneat/falso';
import { define } from 'typeorm-seeding';
import { User } from '../user.entity';

define(User, () => {
  const user = new User(randUuid());

  user.email = randEmail();
  user.name = randFullName();
  user.password = randPassword();

  return user;
});
