"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Cars", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            plate: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            manufacture: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            model: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            rent_per_day: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            capacity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            transmission: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            available: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            availableAt: {
                type: Sequelize.DATE,
                allowNull: true,
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
                allowNull: true,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Cars");
    },
};
