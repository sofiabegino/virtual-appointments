"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = exports.USER_TABLE = void 0;
const sequelize_1 = require("sequelize");
exports.USER_TABLE = 'users';
exports.UserSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    phoneNumber: {
        allowNull: true,
        field: 'phone_number',
        type: sequelize_1.DataTypes.STRING
    },
    weight: {
        allowNull: true,
        type: sequelize_1.DataTypes.NUMBER
    },
    height: {
        allowNull: true,
        type: sequelize_1.DataTypes.NUMBER
    },
    otherInfo: {
        allowNull: true,
        field: 'other_info',
        type: sequelize_1.DataTypes.NUMBER
    },
    role: {
        allowNull: false,
        type: sequelize_1.DataTypes.ENUM('Patient', 'Doctor')
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
        defaultValue: sequelize_1.Sequelize.fn('now')
    }
};
class User extends sequelize_1.Model {
    static associate() {
        // associate
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: exports.USER_TABLE,
            modelName: 'User',
            timestamps: false
        };
    }
}
exports.User = User;
