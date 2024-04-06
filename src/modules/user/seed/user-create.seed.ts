import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../user.entity';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    // console.log('Hitted UserCreateSeed 123');

    await factory(User)().create({
      email: 'aliefalief@gmail.com',
      name: 'alief alief',
      password: '123456',
    });

    await factory(User)().create({
      email: 'bagassanjaya@gmail.com',
      name: 'Bagas Sanjaya',
      password: '123456',
    });

    await factory(User)().create({
      email: 'murikosatu@gmail.com',
      name: 'Muriko Satu',
      password: '123456',
    });

    await factory(User)().createMany(3);
  }
}
