// CREATE TABLE subcategories (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     category_code VARCHAR(50) NOT NULL,
//     -- Add other columns as needed
//     FOREIGN KEY (category_code) REFERENCES categories(code)
//   );
// create
// generate code for
import { DataTypes } from 'sequelize';
import {sequelize} from './db.js';

const subCategory = sequelize.define('subcategories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subcategory_code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_code: {
        type: DataTypes.STRING,
        allowNull: false
    }

});


export default subCategory;