import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserOwnershipAdd1618601431344 implements MigrationInterface {
  name = 'UserOwnershipAdd1618601431344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "created_by" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "modified_by" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "modified_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "deleted_on" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_on"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "modified_on"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_on"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "modified_by"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
