import * as DomainModel   from './domain-model/index.mjs';
import * as RestAPI       from './api/restApi/app.mjs';
import config             from './config.cjs';

export default class AppProvider {
    sequelizeInstance = null;

    initApp() {
        this.initDomainModelLayer();
        this.subscribeToSystemSignals();
        console.info(`[App] Init Mode: ${process.env.MODE}`);

        return this;
    }

    start(params = {}) {
        RestAPI.start({
            appPort : config.appPort,
            ...params
        });
    }

    initDomainModelLayer() {
        const dbMode   = process.env.MODE === 'application' ? 'db' : 'test-db';
        const { sequelize }    = DomainModel.initModels(config[dbMode]);

        this.sequelizeInstance = sequelize;
    }


    subscribeToSystemSignals() {
        process.on('SIGTERM', async () => {
            console.info('[App] SIGTERM signal catched');

            await this.shutdown();
        });

        process.on('SIGINT', async () => {
            console.info('[App] SIGINT signal catched');

            await this.shutdown();
        });

        process.on('unhandledRejection', error => {
            console.error(error);
        });

        process.on('uncaughtException', error => {
            console.error(error);
        });
    }

    async shutdown() {
        await RestAPI.stop();
        console.info('[App] Closing sequelize connections');
        await this.sequelizeInstance.close();

        console.info('[App] Exit');
        process.exit(0);
    }
}
