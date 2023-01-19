import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1674135679201 implements MigrationInterface {
    name = 'CreateUser1674135679201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'KARYAWAN')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'KARYAWAN', CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
