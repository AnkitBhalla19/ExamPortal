import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('ExamPortal', 'postgres', 'Ankit', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
  define: {
    timestamps: false,
    underscored: true,
  },
});

export { sequelize };
