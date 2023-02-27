import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePenjualan1677487513712 implements MigrationInterface {
    name = 'CreatePenjualan1677487513712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "penjualan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tanggal" TIMESTAMP NOT NULL, "barang" character varying NOT NULL, "jumlah_barang" integer NOT NULL, "total_harga" integer NOT NULL, CONSTRAINT "PK_6ff26ee7df74686ae5c57a8285d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "penjualan"`);
    }

}
