import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePurchase1679465870491 implements MigrationInterface {
    name = 'CreatePurchase1679465870491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoice" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "unit" "public"."purchases_unit_enum" NOT NULL DEFAULT 'PCS', "cost" integer NOT NULL, "debt" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "supplierId" uuid, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase_items" ("itemsId" uuid NOT NULL, "purchasesId" uuid NOT NULL, CONSTRAINT "PK_7434adfb6d8157a6adbec934423" PRIMARY KEY ("itemsId", "purchasesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22f9af619377c0292ee8b9375b" ON "purchase_items" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9b5309aad93b08250cb7e47bc0" ON "purchase_items" ("purchasesId") `);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_77980c752fdeb3689e318fde424" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_22f9af619377c0292ee8b9375bb" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_9b5309aad93b08250cb7e47bc09" FOREIGN KEY ("purchasesId") REFERENCES "purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_9b5309aad93b08250cb7e47bc09"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_22f9af619377c0292ee8b9375bb"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_77980c752fdeb3689e318fde424"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b5309aad93b08250cb7e47bc0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22f9af619377c0292ee8b9375b"`);
        await queryRunner.query(`DROP TABLE "purchase_items"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
    }

}
