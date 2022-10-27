export const up = (queryInterface, Sequelize) => queryInterface.createTable('todo', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(20)
  },
  description: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  author: {
    allowNull: false,
    type: Sequelize.STRING(20)
  },
  isComplete: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DATE
  },
});

export const down = (queryInterface) => queryInterface.dropTable('todo');
