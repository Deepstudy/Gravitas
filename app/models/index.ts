import {sequelize} from '../configs/Sequelize';
import * as Sequelize from 'sequelize';
import User from './User';
import UserSession from './UserSession';
import Notes from './Notes';


const db = {
    sequelize,
    Sequelize,
    User,
    UserSession,
    Notes

};

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate ) {
        db[modelName].associate(db);
    }
});

export default db;
