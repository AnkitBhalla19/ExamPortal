import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('ExamPortal', 'postgres', 'Piyush@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  define: {
    timestamps: false,
    underscored: true,
  },
});

export { sequelize };
