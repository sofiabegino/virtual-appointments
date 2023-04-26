"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionSchema = exports.Submission = exports.SUBMISSION_TABLE = void 0;
const sequelize_1 = require("sequelize");
exports.SUBMISSION_TABLE = 'submissions';
const user_model_1 = require("./user.model");
class Submission extends sequelize_1.Model {
    static associate() {
        this.belongsTo(user_model_1.User, {
            as: "doctor",
            foreignKey: "doctorId",
            targetKey: "id"
        });
        this.belongsTo(user_model_1.User, {
            as: "user",
            foreignKey: "userId",
            targetKey: "id"
        });
    }
}
exports.Submission = Submission;
const SubmissionSchema = (sequelize) => {
    Submission.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        file: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING,
        },
        userId: {
            field: 'user_id',
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER,
            unique: true,
            references: {
                model: user_model_1.USER_TABLE,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        doctorId: {
            field: 'doctor_id',
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER,
            unique: true,
            references: {
                model: user_model_1.USER_TABLE,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        otherInfo: {
            field: 'other_info',
            allowNull: true,
            type: sequelize_1.DataTypes.STRING
        },
        symptoms: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING
        },
        status: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
            field: 'created_at',
            defaultValue: sequelize_1.Sequelize.fn('now')
        }
    }, {
        sequelize,
        tableName: 'submissions',
        timestamps: false
    });
};
exports.SubmissionSchema = SubmissionSchema;
