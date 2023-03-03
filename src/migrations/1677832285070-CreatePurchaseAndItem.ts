import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePurchaseAndItem1677832285070 implements MigrationInterface {
    name = 'CreatePurchaseAndItem1677832285070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "unit" "public"."purchases_unit_enum" NOT NULL DEFAULT 'PCS', "cost" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "capital_price" integer NOT NULL, "wholescale_price" integer NOT NULL, "stock" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items_categories_category" ("itemsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_11bbdf027d8cd6df6519849d346" PRIMARY KEY ("itemsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0021f79b69796d60bb4ba37a9" ON "items_categories_category" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21b173125bde50b88c92da02c4" ON "items_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "items_purchases_purchases" ("itemsId" uuid NOT NULL, "purchasesId" uuid NOT NULL, CONSTRAINT "PK_58f1a074701bcf03e580b0343a2" PRIMARY KEY ("itemsId", "purchasesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_189da9e3c362831cdb3c971d01" ON "items_purchases_purchases" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1cdb0a28545affbabfc2757851" ON "items_purchases_purchases" ("purchasesId") `);
        await queryRunner.query(`ALTER TABLE "items_categories_category" ADD CONSTRAINT "FK_b0021f79b69796d60bb4ba37a9a" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "items_categories_category" ADD CONSTRAINT "FK_21b173125bde50b88c92da02c4a" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_purchases_purchases" ADD CONSTRAINT "FK_189da9e3c362831cdb3c971d015" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "items_purchases_purchases" ADD CONSTRAINT "FK_1cdb0a28545affbabfc27578516" FOREIGN KEY ("purchasesId") REFERENCES "purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_purchases_purchases" DROP CONSTRAINT "FK_1cdb0a28545affbabfc27578516"`);
        await queryRunner.query(`ALTER TABLE "items_purchases_purchases" DROP CONSTRAINT "FK_189da9e3c362831cdb3c971d015"`);
        await queryRunner.query(`ALTER TABLE "items_categories_category" DROP CONSTRAINT "FK_21b173125bde50b88c92da02c4a"`);
        await queryRunner.query(`ALTER TABLE "items_categories_category" DROP CONSTRAINT "FK_b0021f79b69796d60bb4ba37a9a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1cdb0a28545affbabfc2757851"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_189da9e3c362831cdb3c971d01"`);
        await queryRunner.query(`DROP TABLE "items_purchases_purchases"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21b173125bde50b88c92da02c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0021f79b69796d60bb4ba37a9"`);
        await queryRunner.query(`DROP TABLE "items_categories_category"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
    }

}
