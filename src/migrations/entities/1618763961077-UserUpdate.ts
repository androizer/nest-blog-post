import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserUpdate1618763961077 implements MigrationInterface {
  name = 'UserUpdate1618763961077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`,
    );
    await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "authorId" TO "author_id"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorId"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "postId"`);
    await queryRunner.query(`ALTER TABLE "comment" ADD "author_id" uuid`);
    await queryRunner.query(`ALTER TABLE "comment" ADD "post_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_2f1a9ca8908fc8168bc18437f62" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_3ce66469b26697baa097f8da923"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_2f1a9ca8908fc8168bc18437f62"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "post_id"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "author_id"`);
    await queryRunner.query(`ALTER TABLE "comment" ADD "postId" uuid`);
    await queryRunner.query(`ALTER TABLE "comment" ADD "authorId" uuid`);
    await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "author_id" TO "authorId"`);
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
