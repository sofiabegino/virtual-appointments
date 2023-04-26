"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.USER_TABLE = void 0;
const sequelize_1 = require("sequelize");
exports.USER_TABLE = 'users';
class User extends sequelize_1.Model {
    static associate() {
    }
}
exports.User = User;
const UserSchema = (sequelize) => {
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
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
            type: sequelize_1.DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
            field: 'created_at',
            defaultValue: sequelize_1.Sequelize.fn('now')
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false
    });
};
exports.UserSchema = UserSchema;
