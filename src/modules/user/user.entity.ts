import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class User extends EntityRef {
  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await hash(password || this.password, 10);
  }

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;
}
