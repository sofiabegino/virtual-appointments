import { Model, DataTypes, Sequelize } from 'sequelize';

export const SUBMISSION_TABLE='submissions';
import { User, UserSchema, USER_TABLE } from './user.model';

export class Submission extends Model {
    static associate() {
        this.belongsTo(User, {
            as: "doctor",
            foreignKey: "doctorId",
            targetKey: "id"
        });
        this.belongsTo(User, {
            as: "user",
            foreignKey: "userId",
            targetKey: "id"
        });
    }
    public id!: number;
    public title!: string;
    public doctorId?: string;
    public userId?: string;
    public file?: string;
    public symptoms?: string;
    public status?: string;
    public createdAt?: string;
}


export const SubmissionSchema = (sequelize: Sequelize) => {
    Submission.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            allowNull:false,
            type:DataTypes.STRING,
            unique:true,
        },
        file:{
            allowNull:true,
            type:DataTypes.STRING,
        },
        userId:{
            field: 'user_id',
            allowNull: true,
            type: DataTypes.INTEGER,
            unique: true,
            references: {
              model: USER_TABLE,
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        doctorId:{
            field: 'doctor_id',
            allowNull: true,
            type: DataTypes.INTEGER,
            unique: true,
            references: {
              model: USER_TABLE,
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        otherInfo:{
            field: 'other_info',
            allowNull:true,
            type:DataTypes.STRING
        },
        symptoms:{
            allowNull:false,
            type:DataTypes.STRING
        },
        status:{
            allowNull:false,
            type:DataTypes.STRING,
        },
        createdAt:{
            allowNull:false,
            type:DataTypes.DATE,
            field:'created_at',
            defaultValue:Sequelize.fn('now')
        }},{
        sequelize,
        tableName: 'submissions',
        timestamps: false
    });
}

