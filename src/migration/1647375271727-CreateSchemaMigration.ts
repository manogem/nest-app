import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSchemaMigration1647375271727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema('nestjs');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropSchema('');
    }

}
