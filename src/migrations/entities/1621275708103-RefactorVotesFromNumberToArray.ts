import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorVotesFromNumberToArray1621275708103 implements MigrationInterface {
  name = 'RefactorVotesFromNumberToArray1621275708103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "votes"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "votes" uuid array NOT NULL DEFAULT '{}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "votes"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "votes" integer DEFAULT '0'`);
  }
}
