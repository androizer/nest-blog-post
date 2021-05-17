import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImageEntityRelationsWithPost1619954059174 implements MigrationInterface {
  name = 'ImageEntityRelationsWithPost1619954059174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image" ("created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "modified_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_on" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "blob" bytea NOT NULL, "name" character varying NOT NULL, "content_type" character varying NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "post" ADD "image_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "UQ_0c74d0ac8869bc3a3cbaa3ec55d" UNIQUE ("image_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_0c74d0ac8869bc3a3cbaa3ec55d" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_0c74d0ac8869bc3a3cbaa3ec55d"`);
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_0c74d0ac8869bc3a3cbaa3ec55d"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "image_id"`);
    await queryRunner.query(`DROP TABLE "image"`);
  }
}
