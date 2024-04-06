import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1712309256463 implements MigrationInterface {
  name = 'InitialMigration1712309256463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
