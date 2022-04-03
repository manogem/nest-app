import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUserTable1647377541521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table({
            name: "nestjs.user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "firstName",
                    type: "varchar",
                },
                {
                    name: "lastName",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "createDate",
                    type: "timestamptz",
                },
                {
                    name: "isActive",
                    type: "bool",
                    default: true
                }
            ]
        }), true);

        await queryRunner.createUniqueConstraint("nestjs.user", new TableIndex({
            name: "IDX_EMAIL",
            columnNames: ["email"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropTable("nestjs.user");
    }

}
