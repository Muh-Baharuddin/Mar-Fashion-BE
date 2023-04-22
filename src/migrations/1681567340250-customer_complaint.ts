import { MigrationInterface, QueryRunner } from "typeorm";

export class customerComplaint1681567340250 implements MigrationInterface {
    name = 'customerComplaint1681567340250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_complaint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "address" character varying, "city" character varying, "description" character varying NOT NULL, CONSTRAINT "PK_fbbbfe2a7efbaf6a7917a1f91d7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer_complaint"`);
    }

}
