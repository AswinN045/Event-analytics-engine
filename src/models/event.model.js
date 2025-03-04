import { Model, Sequelize } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Events extends Model {

    }
    Events.init(
        {
            id: {
                type: DataTypes.BIGINT,
                field: "id",
                primaryKey: true,
                unique: true,
                allowNull: false,
                autoIncrement: true,
            },
            appId: {
                type: DataTypes.BIGINT,
                field: 'app_id',
                allowNull: false
            },
            event: {
                type: DataTypes.STRING,
                allowNull: false
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            referrer: {
                type: DataTypes.STRING,
                allowNull: false
            },
            device: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ipAddress: {
                type: DataTypes.STRING,
                field: 'ip_address',
                allowNull: false
            },
            timestamp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            metadata: {
                type: DataTypes.JSONB,
                allowNull: false
            },
            userId: {
                type: DataTypes.STRING,
                field: 'user_id',
                allowNull: false
            },
            uEventId: {
                type: DataTypes.UUID,
                field: 'u_event_id',
                defaultValue: Sequelize.UUIDV4,
                unique: true,
            }
        },
        {
            sequelize,
            modelName: 'Events',
            schema: 'events',
            tableName: 'events',
            freezeTableName: true,
            paranoid: true,
            timestamps: false
        }
    );

    Events.sync({ force: false })
        .then(() => {
        })
        .catch((error) => {
            console.error('Error creating user table:', error);
        });

    return Events;
};