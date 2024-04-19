"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Spec extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Spec.belongsToMany(models.Car, {
                through: "Car_specs",
                foreignKey: "spec_id",
                as: "cars",
            });
        }
    }
    Spec.init(
        {
            name: DataTypes.STRING,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Spec",
            paranoid: true, // enable soft delete
        }
    );
    return Spec;
};
