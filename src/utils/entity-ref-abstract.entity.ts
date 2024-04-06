import { IsUUID } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
// import { ObjectRef } from 'src/types';

// Optionally (recommended) can pass generic type
// for extra clear definition of intended entity ref
// eslint-disable-next-line
export abstract class EntityRef<T extends EntityRef = ObjectRef>
  implements ObjectRef
{
  @IsUUID('4')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export type ObjectRef = {
  id: string;
};

export interface MockEntityRef<T extends EntityRef> {
  new (id: string): T;
}
