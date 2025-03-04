import { Model, Sequelize } from 'sequelize';

export default (sequelize, DataTypes) => {
  class App extends Model {

  }
  App.init(
    {
      id: {
        type: DataTypes.BIGINT,
        field: "id",
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM("App", "Website"),
        allowNull: false,
        defaultValue: "App"
      },
      apiKey: {
        type: DataTypes.STRING,
        field: 'api_key',
        allowNull: true
      },
      uAppId: {
        type: DataTypes.UUID,
        field: "u_web_id",
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      }
    },
    {
      sequelize,
      modelName: 'App',
      schema: 'events',
      tableName: 'app',
      freezeTableName: true,
      paranoid: true,
      timestamps: false
    }
  );

  App.sync({ force: false })
    .then(() => {
    })
    .catch((error) => {
      console.error('Error creating user table:', error);
    });

  return App;
};