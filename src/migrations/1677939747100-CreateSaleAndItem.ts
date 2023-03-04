import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSaleAndItem1677939747100 implements MigrationInterface {
    name = 'CreateSaleAndItem1677939747100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "unit" "public"."sales_unit_enum" NOT NULL DEFAULT 'PCS', "total_sales" integer NOT NULL, "total_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "customerId" uuid, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "capital_price" integer NOT NULL, "wholescale_price" integer NOT NULL, "stock" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "supplierId" uuid, "saleId" uuid, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items_categories_category" ("itemsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_11bbdf027d8cd6df6519849d346" PRIMARY KEY ("itemsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0021f79b69796d60bb4ba37a9" ON "items_categories_category" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_21b173125bde50b88c92da02c4" ON "items_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "items_purchases_purchases" ("itemsId" uuid NOT NULL, "purchasesId" uuid NOT NULL, CONSTRAINT "PK_58f1a074701bcf03e580b0343a2" PRIMARY KEY ("itemsId", "purchasesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_189da9e3c362831cdb3c971d01" ON "items_purchases_purchases" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1cdb0a28545affbabfc2757851" ON "items_purchases_purchases" ("purchasesId") `);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_3a92cf6add00043cef9833db1cd" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_acc043f0f22a28b521fe43a28b0" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_290c36d95601e62bf8651432911" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_290c36d95601e62bf8651432911"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_acc043f0f22a28b521fe43a28b0"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_3a92cf6add00043cef9833db1cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1cdb0a28545affbabfc2757851"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_189da9e3c362831cdb3c971d01"`);
        await queryRunner.query(`DROP TABLE "items_purchases_purchases"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21b173125bde50b88c92da02c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0021f79b69796d60bb4ba37a9"`);
        await queryRunner.query(`DROP TABLE "items_categories_category"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "sales"`);
    }

}
