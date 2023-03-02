import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemsAndCategory1677748799788 implements MigrationInterface {
    name = 'CreateItemsAndCategory1677748799788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "entry_date"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "exit_date"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "total_saving"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "create_by"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "update_by"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "alamat" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "nomor_telepon" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "nomor_telepon"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "alamat"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "update_by" character varying`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "create_by" character varying`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "total_saving" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "exit_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "entry_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "phone_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "address" character varying NOT NULL`);
    }

}
