"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Car_option extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Car_option.init(
        {
            car_id: DataTypes.INTEGER,
            option_id: DataTypes.INTEGER,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Car_option",
            paranoid: true, // enable soft delete
        }
    );
    return Car_option;
};
