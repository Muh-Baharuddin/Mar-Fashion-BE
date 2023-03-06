import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployee1678079071869 implements MigrationInterface {
    name = 'CreateEmployee1678079071869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phone_number" character varying NOT NULL, "entry_date" TIMESTAMP NOT NULL, "exit_date" TIMESTAMP, "total_saving" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_Savings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "type" "public"."employee_Savings_type_enum" NOT NULL DEFAULT 'SIMPANAN', "total" integer NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "employeeId" uuid, CONSTRAINT "PK_e9677faa9c07e80f9d78543f95d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_Savings" ADD CONSTRAINT "FK_33f939364c2c39fe3047f10a68b" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_Savings" DROP CONSTRAINT "FK_33f939364c2c39fe3047f10a68b"`);
        await queryRunner.query(`DROP TABLE "employee_Savings"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
