import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBarangAndKategori1674652163941 implements MigrationInterface {
    name = 'CreateBarangAndKategori1674652163941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "kategori" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nama" character varying NOT NULL, CONSTRAINT "PK_06a98d8feabd77edd2f8cb69090" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "barang_kategori_kategori" ("barangId" uuid NOT NULL, "kategoriId" uuid NOT NULL, CONSTRAINT "PK_098a4c7dad1c310f7671b42ec0a" PRIMARY KEY ("barangId", "kategoriId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ceb2b8629530498971df2632b" ON "barang_kategori_kategori" ("barangId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1e48775cfc98b943631e2b4905" ON "barang_kategori_kategori" ("kategoriId") `);
        await queryRunner.query(`ALTER TABLE "barang" DROP COLUMN "jenis_barang"`);
        await queryRunner.query(`ALTER TABLE "barang_kategori_kategori" ADD CONSTRAINT "FK_8ceb2b8629530498971df2632b6" FOREIGN KEY ("barangId") REFERENCES "barang"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "barang_kategori_kategori" ADD CONSTRAINT "FK_1e48775cfc98b943631e2b4905d" FOREIGN KEY ("kategoriId") REFERENCES "kategori"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barang_kategori_kategori" DROP CONSTRAINT "FK_1e48775cfc98b943631e2b4905d"`);
        await queryRunner.query(`ALTER TABLE "barang_kategori_kategori" DROP CONSTRAINT "FK_8ceb2b8629530498971df2632b6"`);
        await queryRunner.query(`ALTER TABLE "barang" ADD "jenis_barang" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1e48775cfc98b943631e2b4905"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ceb2b8629530498971df2632b"`);
        await queryRunner.query(`DROP TABLE "barang_kategori_kategori"`);
        await queryRunner.query(`DROP TABLE "kategori"`);
    }

}
