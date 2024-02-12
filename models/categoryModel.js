import { DataTypes } from 'sequelize';
import {sequelize} from './db.js'; 


const Category = sequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
});


export default Category;
