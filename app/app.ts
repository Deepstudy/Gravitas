import * as dotenv from 'dotenv';

dotenv.config();
import { sequelize } from '@app/configs/Sequelize';
import {Routes} from '@app/routes/routes';
import Logger from '@app/services/Logger';
// import TraceIdService from '@nineleaps/trace-id-service';
import * as bodyParser from 'body-parser';
import express from 'express';
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import uuid from 'uuid/v4';
import AppConstants, { ERROR_CODES, ERROR_MESSAGES } from './constants/AppConstants';
import { AppResponse } from './services/AppResponse';

export default class App {
    public app: express.Application;
    public routes: Routes = new Routes();
    

    constructor() {
        this.app = express();
        this.dbSetup();
        this.config();
        this.routes.routes(this.app);
        this.errorHandler();
    }

   

    private config(): void {
        this.app.use(bodyParser.json());
    }

    private dbSetup(): void {
        Logger.info('Connecting to DB');
        sequelize
            .authenticate()
            .then(() => {
                Logger.info('Connected to DB');
            })
            .catch((err) => {
                Logger.error('Unable to connect to DB', err);
            });
    }

   


    private errorHandler(): void {
        this.app.use((err, req, res, next) => {
            if (err) {
                const appResponse = new AppResponse();

                if (err.name === 'UnauthorizedError') {
                    appResponse.unauthorized(res, AppConstants.ERROR_CODES.ERR_UNAUTHORIZED, err.message, '');
                } else {
                    Logger.error(err.stack);
                    appResponse.error(res,
                        ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                        ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR, '');
                }
            }
        });
    }

}
