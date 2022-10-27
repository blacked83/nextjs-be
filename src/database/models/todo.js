import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Todo extends Model { }

  Todo.init({
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    modelName: 'todo',
    tableName: 'todo',
    sequelize,
    paranoid: true
  });

  return Todo;
}
