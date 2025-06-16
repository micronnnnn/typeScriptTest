"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Dessert.ts
const sequelize_1 = require("sequelize");
const RDB_1 = require("../config/RDB"); // 請根據實際路徑修改
// 用類別擴充 Sequelize Model
class Dessert extends sequelize_1.Model {
}
// 定義 model
Dessert.init({
    dessert_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'DESSERT_ID',
    },
    dessert_preserve_date: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
        field: 'DESSERT_DATE',
    },
    dessert_type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 2,
        },
        field: 'DESSERT_TYPE_ID',
    },
    dessert_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^[\u4e00-\u9fa5a-zA-Z]+$/i,
        },
        field: 'DESSERT_NAME',
    },
    dessert_price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
        field: 'DESSERT_PRICE',
    },
    dessert_amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
        field: 'DESSERT_AMOUNT',
    },
    dessert_instruction: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'DESSERT_INSTRUCTION',
    },
    dessert_total_score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'TKT_TOTAL_SCORE',
    },
    dessert_total_people: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'TKT_TOTAL_PEOPLE',
    },
    dessert_pic: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: true,
        field: 'DESSERT_IMG',
    },
}, {
    sequelize: RDB_1.sequelize,
    tableName: 'dessert',
    timestamps: false,
});
exports.default = Dessert;
