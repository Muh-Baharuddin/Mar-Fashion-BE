import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIncome1677943879583 implements MigrationInterface {
    name = 'CreateIncome1677943879583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "incomes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "total" integer NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_d737b3d0314c1f0da5461a55e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "incomeId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_df47265724160847948d1510f13" FOREIGN KEY ("incomeId") REFERENCES "incomes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_df47265724160847948d1510f13"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "incomeId"`);
        await queryRunner.query(`DROP TABLE "incomes"`);
    }

}
