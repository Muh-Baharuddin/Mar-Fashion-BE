import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateKaryawan1674562842094 implements MigrationInterface {
    name = 'CreateKaryawan1674562842094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "karyawan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nama" character varying NOT NULL, "alamat" character varying NOT NULL, "nomor_telepon" character varying NOT NULL, CONSTRAINT "PK_fdb8d1ca3cdb99f669a0d9085a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "barang" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "merek" character varying NOT NULL, "jenis_barang" character varying NOT NULL, "size" character varying NOT NULL, "warna" character varying NOT NULL, "stok" integer NOT NULL, "harga" integer NOT NULL, CONSTRAINT "PK_f72eb4a0ebce770648bd746560f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "barang"`);
        await queryRunner.query(`DROP TABLE "karyawan"`);
    }

}
