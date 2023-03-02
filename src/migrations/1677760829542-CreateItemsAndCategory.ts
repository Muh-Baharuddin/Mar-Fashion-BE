import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemsAndCategory1677760829542 implements MigrationInterface {
    name = 'CreateItemsAndCategory1677760829542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "capital_price" integer NOT NULL, "wholescale_price" integer NOT NULL, "stock" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items_categories_category" ("itemsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_11bbdf027d8cd6df6519849d346" PRIMARY KEY ("itemsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0021f79b69796d60bb4ba37a9" ON "items_categories_category" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21b173125bde50b88c92da02c4" ON "items_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "items_categories_category" ADD CONSTRAINT "FK_b0021f79b69796d60bb4ba37a9a" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "items_categories_category" ADD CONSTRAINT "FK_21b173125bde50b88c92da02c4a" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_categories_category" DROP CONSTRAINT "FK_21b173125bde50b88c92da02c4a"`);
        await queryRunner.query(`ALTER TABLE "items_categories_category" DROP CONSTRAINT "FK_b0021f79b69796d60bb4ba37a9a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21b173125bde50b88c92da02c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0021f79b69796d60bb4ba37a9"`);
        await queryRunner.query(`DROP TABLE "items_categories_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "items"`);
    }

}
