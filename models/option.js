"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Option extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Option.belongsToMany(models.Car, {
                through: "Car_options",
                foreignKey: "option_id",
                as: "cars",
            });
        }
    }
    Option.init(
        {
            name: DataTypes.STRING,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Option",
            paranoid: true, // enable soft delete
        }
    );
    return Option;
};
