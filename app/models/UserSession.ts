import {sequelize} from '../configs/Sequelize'
import IUserSession from '../interfaces/models/IUserSession';
import * as Sequelize from 'sequelize';
  
interface IUserSessionInstance extends Sequelize.Instance<IUserSession>, IUserSession {}

const UserSession = sequelize.define<IUserSessionInstance, IUserSession>(
    'user_session',
    {
        id: {
            type: Sequelize.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId:{
            type:Sequelize.INTEGER(),
            allowNull:false,
            field:'user_id'
        },
        deviceId:{
            type:Sequelize.STRING(),
            field:'device_id'
        },
        deviceToken:{
            type:Sequelize.STRING(),
            field:'device_token'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'updated_at',
        },
    },
);

UserSession.associate = (models) => {
    UserSession.belongsTo(models.User, { targetKey: 'id', foreignKey: 'user_id' });
};

export default UserSession;
