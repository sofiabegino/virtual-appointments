import { Model, DataTypes, Sequelize } from 'sequelize';

export const USER_TABLE = 'users';

export class User extends Model {
    static associate() {
      
    }
    public id!: number;
    public name!: string;
    public password!: string;
    public email!: string;
    public role!: string;
    public phoneNumber?: string;
    public weight?: string;
    public height?: string;
    public otherInfo?: string;
    public createdAt!: string;
}

export const UserSchema = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        phoneNumber: {
            allowNull: true,
            field: 'phone_number',
            type: DataTypes.STRING
        },
        weight: {
            allowNull: true,
            type: DataTypes.NUMBER
        },
        height: {
            allowNull: true,
            type: DataTypes.NUMBER
        },
        // active:{
        //     allowNull: false,
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        // },
        // verificationToken:{
        //     allowNull: true,
        //     field: 'verification_token',
        //     type: DataTypes.STRING
        // },
        otherInfo: {
            allowNull: true,
            field: 'other_info',
            type: DataTypes.NUMBER
        },
        role: {
            allowNull: false,
            type: DataTypes.ENUM('Patient','Doctor')
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: Sequelize.fn('now')
        }},{
        sequelize,
        tableName: 'users',
        timestamps: false
    });
}

