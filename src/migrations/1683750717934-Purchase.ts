import { MigrationInterface, QueryRunner } from "typeorm";

export class Purchase1683750717934 implements MigrationInterface {
    name = 'Purchase1683750717934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoice" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "unit" "public"."purchases_unit_enum" NOT NULL DEFAULT 'PCS', "amount" integer NOT NULL, "total" integer NOT NULL, "debt" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "supplierId" uuid, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "capital_price" integer NOT NULL, "wholescale_price" integer NOT NULL, "stock" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "supplierId" uuid, "saleId" uuid, "purchasesId" uuid, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items_categories" ("itemsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_f9c1ac6227ec8048f9452136677" PRIMARY KEY ("itemsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8423955d67ecfddf131741d04" ON "items_categories" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3002af522c700622e65d1ae1bc" ON "items_categories" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_77980c752fdeb3689e318fde424" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_acc043f0f22a28b521fe43a28b0" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_290c36d95601e62bf8651432911" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_d2afeefad861644f9a8fde7718d" FOREIGN KEY ("purchasesId") REFERENCES "purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_categories" ADD CONSTRAINT "FK_f8423955d67ecfddf131741d044" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "items_categories" ADD CONSTRAINT "FK_3002af522c700622e65d1ae1bcd" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_categories" DROP CONSTRAINT "FK_3002af522c700622e65d1ae1bcd"`);
        await queryRunner.query(`ALTER TABLE "items_categories" DROP CONSTRAINT "FK_f8423955d67ecfddf131741d044"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_d2afeefad861644f9a8fde7718d"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_290c36d95601e62bf8651432911"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_acc043f0f22a28b521fe43a28b0"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_77980c752fdeb3689e318fde424"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3002af522c700622e65d1ae1bc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8423955d67ecfddf131741d04"`);
        await queryRunner.query(`DROP TABLE "items_categories"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
    }

}
