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
    'gravitas',
    'root',
    'uselessc1354',
    {
        host:'localhost',
        port:3306,
        dialect:'mysql',
        logging: false,
        pool: {
            // tslint:disable-next-line: radix
            max: 1000,
            // tslint:disable-next-line: radix
            min:10,
            // tslint:disable-next-line: radix
            idle:0,
        },
    },
);


