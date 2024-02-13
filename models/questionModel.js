import { DataTypes } from 'sequelize';
import {sequelize} from './db.js'; 


const Question = sequelize.define('questions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      unique:true,
      allowNull: false
    },
    test_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'tests', // This refers to the table name
        key: 'code'
      }
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    option1: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    option2: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    option3: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    option4: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    correct_option: {
        type: DataTypes.INTEGER, // Assuming you store the correct option index (1, 2, 3, or 4)
        allowNull: false
    },
});


export default Question;