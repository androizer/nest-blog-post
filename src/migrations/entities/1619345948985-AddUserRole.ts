import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRole1619345948985 implements MigrationInterface {
  name = 'AddUserRole1619345948985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "role" text array NOT NULL DEFAULT '{user}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
