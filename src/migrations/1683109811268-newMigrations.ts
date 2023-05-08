import { MigrationInterface, QueryRunner } from "typeorm";

export class newMigrations1683109811268 implements MigrationInterface {
    name = 'newMigrations1683109811268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "incomes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "total" integer NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_d737b3d0314c1f0da5461a55e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoice" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "unit" "public"."purchases_unit_enum" NOT NULL DEFAULT 'PCS', "cost" integer NOT NULL, "debt" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "supplierId" uuid, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "capital_price" integer NOT NULL, "wholescale_price" integer NOT NULL, "stock" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "supplierId" uuid, "saleId" uuid, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoice" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "unit" "public"."sales_unit_enum" NOT NULL DEFAULT 'PCS', "amount" integer NOT NULL, "total" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "customerId" uuid, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying, "city" character varying, "phone_number" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_complaint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "address" character varying, "city" character varying, "description" character varying NOT NULL, CONSTRAINT "PK_fbbbfe2a7efbaf6a7917a1f91d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phone_number" character varying NOT NULL, "entry_date" TIMESTAMP NOT NULL, "exit_date" TIMESTAMP, "total_saving" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_Savings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "type" "public"."employee_Savings_type_enum" NOT NULL DEFAULT 'SIMPANAN', "total" integer NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "employeeId" uuid, CONSTRAINT "PK_e9677faa9c07e80f9d78543f95d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_d72d2882d580218610800832547" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items_categories" ("itemsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_f9c1ac6227ec8048f9452136677" PRIMARY KEY ("itemsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8423955d67ecfddf131741d04" ON "items_categories" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3002af522c700622e65d1ae1bc" ON "items_categories" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "purchase_items" ("itemsId" uuid NOT NULL, "purchasesId" uuid NOT NULL, CONSTRAINT "PK_7434adfb6d8157a6adbec934423" PRIMARY KEY ("itemsId", "purchasesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22f9af619377c0292ee8b9375b" ON "purchase_items" ("itemsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9b5309aad93b08250cb7e47bc0" ON "purchase_items" ("purchasesId") `);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_77980c752fdeb3689e318fde424" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_acc043f0f22a28b521fe43a28b0" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_290c36d95601e62bf8651432911" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_3a92cf6add00043cef9833db1cd" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_Savings" ADD CONSTRAINT "FK_33f939364c2c39fe3047f10a68b" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_categories" ADD CONSTRAINT "FK_f8423955d67ecfddf131741d044" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "items_categories" ADD CONSTRAINT "FK_3002af522c700622e65d1ae1bcd" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_22f9af619377c0292ee8b9375bb" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_9b5309aad93b08250cb7e47bc09" FOREIGN KEY ("purchasesId") REFERENCES "purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_9b5309aad93b08250cb7e47bc09"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_22f9af619377c0292ee8b9375bb"`);
        await queryRunner.query(`ALTER TABLE "items_categories" DROP CONSTRAINT "FK_3002af522c700622e65d1ae1bcd"`);
        await queryRunner.query(`ALTER TABLE "items_categories" DROP CONSTRAINT "FK_f8423955d67ecfddf131741d044"`);
        await queryRunner.query(`ALTER TABLE "employee_Savings" DROP CONSTRAINT "FK_33f939364c2c39fe3047f10a68b"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_3a92cf6add00043cef9833db1cd"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_290c36d95601e62bf8651432911"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_acc043f0f22a28b521fe43a28b0"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_77980c752fdeb3689e318fde424"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b5309aad93b08250cb7e47bc0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22f9af619377c0292ee8b9375b"`);
        await queryRunner.query(`DROP TABLE "purchase_items"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3002af522c700622e65d1ae1bc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8423955d67ecfddf131741d04"`);
        await queryRunner.query(`DROP TABLE "items_categories"`);
        await queryRunner.query(`DROP TABLE "store_locations"`);
        await queryRunner.query(`DROP TABLE "employee_Savings"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "customer_complaint"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
        await queryRunner.query(`DROP TABLE "incomes"`);
    }

}
