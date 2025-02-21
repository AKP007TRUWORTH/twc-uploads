import sequelize from '../config/db';
import { DataTypes, Model } from 'sequelize';

class UploadBuilds extends Model { }

UploadBuilds.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  shortId: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  s3Key: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  timestamps: false, // Sequelize will handle createdAt and updatedAt automatically
  tableName: 'UploadBuilds',
  sequelize,
});

export default UploadBuilds;
