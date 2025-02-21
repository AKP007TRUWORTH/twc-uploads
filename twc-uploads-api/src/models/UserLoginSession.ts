import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { v4 as uuidv4 } from "uuid";

export class UserLoginSession extends Model {
    id!: number;
    userId!: number;
    sessionId!: number;
    ipAddress!: string;
    source!: string;
    loginMethod!: string;
    isActive!: boolean;
    loggedOutAt!: Date;
    createdAt!: Date;
}

UserLoginSession.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            allowNull: false
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        source: {
            type: DataTypes.STRING,
        },
        loginMethod: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
        loggedOutAt: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize,
        tableName: 'UserLoginSession'
    }
);