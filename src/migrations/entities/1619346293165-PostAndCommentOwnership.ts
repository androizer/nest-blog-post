import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostAndCommentOwnership1619346293165 implements MigrationInterface {
  name = 'PostAndCommentOwnership1619346293165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ADD "created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD "modified_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "post" ADD "deleted_on" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "post" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "post" ADD "modified_by" uuid`);
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "modified_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "comment" ADD "deleted_on" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "comment" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "comment" ADD "modified_by" uuid`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "modified_by"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "deleted_on"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "modified_on"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "created_on"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "modified_by"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "deleted_on"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "modified_on"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_on"`);
  }
}
