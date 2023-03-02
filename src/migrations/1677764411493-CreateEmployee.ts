import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployee1677764411493 implements MigrationInterface {
    name = 'CreateEmployee1677764411493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee_saving" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "type" "public"."employee_saving_type_enum" NOT NULL DEFAULT 'SIMPANAN', "total" integer NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "employeeId" uuid, CONSTRAINT "PK_b8550331e7dd8b808084fd52946" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phone_number" character varying NOT NULL, "entry_date" TIMESTAMP NOT NULL, "exit_date" TIMESTAMP NOT NULL, "total_saving" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_saving" ADD CONSTRAINT "FK_3b4e28692f5cb27a09d3a0c2676" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_saving" DROP CONSTRAINT "FK_3b4e28692f5cb27a09d3a0c2676"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "employee_saving"`);
    }

}
