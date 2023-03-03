import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSupplier1677838428670 implements MigrationInterface {
    name = 'CreateSupplier1677838428670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "phone_number" character varying NOT NULL, "account_number" character varying NOT NULL, "account_owner" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "supplierId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_77980c752fdeb3689e318fde424" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_77980c752fdeb3689e318fde424"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "supplierId"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
    }

}
