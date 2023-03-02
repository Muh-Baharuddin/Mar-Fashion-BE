import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployeeAndEmployeeSaving1677748249903 implements MigrationInterface {
    name = 'CreateEmployeeAndEmployeeSaving1677748249903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id_employee" uuid NOT NULL DEFAULT uuid_generate_v4(), "nama" character varying NOT NULL, "address" character varying NOT NULL, "phone_number" character varying NOT NULL, "entry_date" TIMESTAMP NOT NULL, "exit_date" TIMESTAMP NOT NULL, "total_saving" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, CONSTRAINT "PK_b9bd6c02b7e061e4b5398ddadd6" PRIMARY KEY ("id_employee"))`);
        await queryRunner.query(`CREATE TABLE "employee_saving" ("id_saving" uuid NOT NULL DEFAULT uuid_generate_v4(), "tanggal" TIMESTAMP NOT NULL, "type" "public"."employee_saving_type_enum" NOT NULL DEFAULT 'SIMPANAN', "total" integer NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "employeeIdEmployee" uuid, CONSTRAINT "PK_ef7817ada4349f48dd360b8b556" PRIMARY KEY ("id_saving"))`);
        await queryRunner.query(`ALTER TABLE "employee_saving" ADD CONSTRAINT "FK_bf714f8b31dd9239857b25010dd" FOREIGN KEY ("employeeIdEmployee") REFERENCES "employees"("id_employee") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_saving" DROP CONSTRAINT "FK_bf714f8b31dd9239857b25010dd"`);
        await queryRunner.query(`DROP TABLE "employee_saving"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
