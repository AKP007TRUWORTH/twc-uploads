import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
        host: process.env.DB_HOST,
        dialect: "mssql",
        logging: false,
        dialectOptions: {
            options: {
                timezone: 'UTC',
            },
        }
    }
);

export const connectDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed: ", error);
    }
};