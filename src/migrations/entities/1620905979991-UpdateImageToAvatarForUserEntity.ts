import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateImageToAvatarForUserEntity1620905979991 implements MigrationInterface {
  name = 'UpdateImageToAvatarForUserEntity1620905979991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4f776c999cfa0294c3c11876c71"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "image_id" TO "avatar_id"`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "UQ_4f776c999cfa0294c3c11876c71" TO "UQ_b777e56620c3f1ac0308514fc4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_b777e56620c3f1ac0308514fc4c" FOREIGN KEY ("avatar_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_b777e56620c3f1ac0308514fc4c"`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "UQ_b777e56620c3f1ac0308514fc4c" TO "UQ_4f776c999cfa0294c3c11876c71"`,
    );
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "avatar_id" TO "image_id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_4f776c999cfa0294c3c11876c71" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
