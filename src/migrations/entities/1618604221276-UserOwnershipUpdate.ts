import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserOwnershipUpdate1618604221276 implements MigrationInterface {
  name = 'UserOwnershipUpdate1618604221276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_by" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "modified_by" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "modified_by" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_by" SET NOT NULL`);
  }
}
