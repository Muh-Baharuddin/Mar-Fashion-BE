import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotaPenjualan1674569633960 implements MigrationInterface {
    name = 'CreateNotaPenjualan1674569633960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nota_penjualan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tanggal" TIMESTAMP NOT NULL, "barang" character varying NOT NULL, "jumlah" integer NOT NULL, "harga" integer NOT NULL, CONSTRAINT "PK_4db22d6a76220a1a1373da09389" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "nota_penjualan"`);
    }

}
