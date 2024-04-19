"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Car_specs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            car_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Cars",
                    key: "id",
                },
                allowNull: false,
            },
            spec_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Specs",
                    key: "id",
                },
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Car_specs");
    },
};
