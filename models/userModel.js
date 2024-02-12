import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from './db.js'; 

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  image: {
    type: DataTypes.STRING,
  },
  resume_path: {
    type: DataTypes.INTEGER,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['admin', 'interviewer', 'candidate']],
    },
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
}, );

export default User;