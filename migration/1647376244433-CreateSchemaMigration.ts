import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSchemaMigration1647376244433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createSchema('nestjs', true);
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropSchema('nestjs', true);
    }

}
