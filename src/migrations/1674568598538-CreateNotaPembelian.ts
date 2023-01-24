import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotaPembelian1674568598538 implements MigrationInterface {
    name = 'CreateNotaPembelian1674568598538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nota_pembelian" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tanggal" TIMESTAMP NOT NULL, "supplier" character varying NOT NULL, "barang" character varying NOT NULL, "biaya" integer NOT NULL, CONSTRAINT "PK_2010fac16e3d64b1b4b46fd68f3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "nota_pembelian"`);
    }

}
