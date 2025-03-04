import Sequelize, { DataTypes } from 'sequelize';
import { database } from '../config/config.js';
import logger from '../config/logger.js';
import AppModel from '../models/apps.model.js'
import EventModel from '../models/event.model.js'

const sequelize = new Sequelize(database.database, database.user, database.password, { dialect: 'postgres', logging: false });


sequelize.createSchema('events', { ifNotExists: true })
    .then(() => {
        logger.info('Schema "events" has been created')
    })
    .catch((error) => {
        if (error.message.includes('schema "events" already exists')) {
            logger.info('Schema events already exists.');
        } else {
            logger.error('Error creating schema:', error);
        }
    });

const App = AppModel(sequelize, DataTypes);
const Events = EventModel(sequelize, DataTypes);


const models = {
    sequelize,
    App,
    Events

};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export { models, App, Events };