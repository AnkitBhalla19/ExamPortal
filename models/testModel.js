import { DataTypes } from 'sequelize';
import {sequelize} from './db.js'; 


const Test = sequelize.define('tests', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    code :{
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    questions: {
        type: DataTypes.INTEGER
    },
    duration_minutes: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true, // Set this to true if you want Sequelize to automatically manage createdAt and updatedAt fields
  });


export default Test;
