import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemsAndCategory1677743782565 implements MigrationInterface {
    name = 'CreateItemsAndCategory1677743782565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nama" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id_item" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "capital_price" integer NOT NULL, "wholescale_price" integer NOT NULL, "stock" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_f425d2daf1cac427d052cd00a03" PRIMARY KEY ("id_item"))`);
        await queryRunner.query(`CREATE TABLE "items_categories_category" ("itemsIdItem" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_836fb2fe3d14882ccbd94238476" PRIMARY KEY ("itemsIdItem", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7f3d7d361d01aed9aa3fb8eee8" ON "items_categories_category" ("itemsIdItem") `);
        await queryRunner.query(`CREATE INDEX "IDX_21b173125bde50b88c92da02c4" ON "items_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "items_categories_category" ADD CONSTRAINT "FK_7f3d7d361d01aed9aa3fb8eee85" FOREIGN KEY ("itemsIdItem") REFERENCES "items"("id_item") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "items_categories_category" ADD CONSTRAINT "FK_21b173125bde50b88c92da02c4a" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_categories_category" DROP CONSTRAINT "FK_21b173125bde50b88c92da02c4a"`);
        await queryRunner.query(`ALTER TABLE "items_categories_category" DROP CONSTRAINT "FK_7f3d7d361d01aed9aa3fb8eee85"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21b173125bde50b88c92da02c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f3d7d361d01aed9aa3fb8eee8"`);
        await queryRunner.query(`DROP TABLE "items_categories_category"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
