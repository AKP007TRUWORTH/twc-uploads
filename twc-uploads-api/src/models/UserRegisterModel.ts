import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { v4 as uuidv4 } from "uuid";

export class UserRegisterModel extends Model {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    isActive!: boolean;
}

UserRegisterModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: "UserRegister",
    }
);