import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImageEntityRelationWithUser1619960726463 implements MigrationInterface {
  name = 'ImageEntityRelationWithUser1619960726463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "image_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_4f776c999cfa0294c3c11876c71" UNIQUE ("image_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_4f776c999cfa0294c3c11876c71" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4f776c999cfa0294c3c11876c71"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_4f776c999cfa0294c3c11876c71"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image_id"`);
  }
}
