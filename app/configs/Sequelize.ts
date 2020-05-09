import Logger from '@app/services/Logger';
import * as Sequelize from 'sequelize';
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
console.log("database", database);

let logSetting: any = true;
if (process.env.ENABLE_SQL_LOG === 'true') {
    logSetting = (str) => {
        Logger.debug(str);
    };
}
export const sequelize = new Sequelize.Sequelize(
    database,
    username,
    password,
    {
        host:host,
        port:parseInt(process.env.DB_PORT),
        dialect:process.env.DB_DIALECT,
        logging:logSetting,
        pool: {
            // tslint:disable-next-line: radix
            max: parseInt(process.env.DB_MAX_CON_POOL),
            // tslint:disable-next-line: radix
            min:parseInt(process.env.DB_MIN_CON_POOL),
            // tslint:disable-next-line: radix
            idle:parseInt(process.env.DB_IDLE_CON),
        },
    },
);


