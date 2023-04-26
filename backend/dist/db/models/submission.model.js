"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.SubmissionSchema = exports.SUBMISSION_TABLE = void 0;
const sequelize_1 = require("sequelize");
exports.SUBMISSION_TABLE = 'submissions';
exports.SubmissionSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    image: {
        type: {
            type: sequelize_1.DataTypes.STRING,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
        data: {
            type: sequelize_1.DataTypes.BLOB("long"),
        },
    },
    doctorAssigned: {
        //assign to doctor id
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    file: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    symtomps: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
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
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: exports.SUBMISSION_TABLE,
            modelName: 'Submission',
            timestamps: false
        };
    }
}
exports.User = User;
