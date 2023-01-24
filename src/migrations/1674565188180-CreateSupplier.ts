import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSupplier1674565188180 implements MigrationInterface {
    name = 'CreateSupplier1674565188180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nama" character varying NOT NULL, "alamat" character varying NOT NULL, "nomor_telepon" character varying NOT NULL, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "supplier"`);
    }

}
