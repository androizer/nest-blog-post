import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTagsToPostEntity1620740435817 implements MigrationInterface {
  name = 'AddTagsToPostEntity1620740435817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "tags" text array NOT NULL DEFAULT '{}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "tags"`);
  }
}
