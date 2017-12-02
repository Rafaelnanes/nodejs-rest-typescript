const models = require('../models');
var Umzug = require('umzug');
import Logger from '../config/logger';

let SCRIPTS = ['20171119141747-insert-data', '20171123204357-user-permissions-insert'];

class SequelizeMigration {

    private umzug: any;

    constructor() {
        this.config();
    }

    private config(): void {
        this.umzug = new Umzug({
            storage: 'sequelize',
            storageOptions: {
                sequelize: models.sequelize,
            },
            logging: false,
            migrations: {
                params: [
                    models.sequelize.getQueryInterface(), // queryInterface
                    models.sequelize.constructor, // DataTypes
                    function () {
                        throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
                    }
                ],
                path: 'server/migrations'
            }
        });
    }

    public migrateOnTest(): Promise<any> {
        return this.umzug.execute({
            migrations: SCRIPTS,
            method: 'up'
        });
    }

    public migrateOnDev(): void {
        this.umzug.executed().then(function (migrations) {

            if (migrations.length != SCRIPTS.length) {
                this.execute({
                    migrations: SCRIPTS,
                    method: 'up'
                }).then(function (executed) {
                    Logger.info("Migrations executed successfully");
                });
            } else {
                Logger.info("Database is updated");
            }
        });

    }

}

export default new SequelizeMigration();
