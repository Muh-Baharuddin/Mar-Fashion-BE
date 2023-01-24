import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRetur1674567515694 implements MigrationInterface {
    name = 'CreateRetur1674567515694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "retur" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tanggal" TIMESTAMP NOT NULL, "barang" character varying NOT NULL, "jumlah" integer NOT NULL, "harga" integer NOT NULL, "keterangan" character varying NOT NULL, CONSTRAINT "PK_47486cfdce32718342fb0e492df" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "retur"`);
    }

}
