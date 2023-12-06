import { MigrationInterface, QueryRunner } from "typeorm";

export class newComplaint1690814904200 implements MigrationInterface {
    name = 'newComplaint1690814904200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_complaint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoice" integer NOT NULL, "name" character varying NOT NULL, "address" character varying, "city" character varying, "description" character varying NOT NULL, CONSTRAINT "PK_fbbbfe2a7efbaf6a7917a1f91d7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer_complaint"`);
    }

}
