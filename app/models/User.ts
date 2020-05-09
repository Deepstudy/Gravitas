import {sequelize} from '../configs/Sequelize'
import IUser from '../interfaces/models/IUser';
import * as Sequelize from 'sequelize';
  
interface IUserInstance extends Sequelize.Instance<IUser>, IUser {}

const User = sequelize.define<IUserInstance, IUser>(
    'users',
    {
        id: {
            type: Sequelize.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        phoneNumber:{
            type:Sequelize.STRING,
            allowNull: false,
            field:'phone_number'
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email:{
            type:Sequelize.STRING
        },
        otp:{
            type:Sequelize.STRING
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
    },{
    tableName:'users',
    underscored: true,
    timestamps: true,
    }
);

User.associate = (models) => {
    User.hasMany(models.UserSession, { foreignKey: 'user_id' });
    User.hasMany(models.Notes,{foreignKey:'created_by'});
};


export default User;
