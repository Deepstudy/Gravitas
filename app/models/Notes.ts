import {sequelize} from '../configs/Sequelize'
import INotes from '../interfaces/models/INotes';
import * as Sequelize from 'sequelize';
  
interface INotesInstance extends Sequelize.Instance<INotes>, INotes {}

const Notes = sequelize.define<INotesInstance, INotes>(
    'notes',
    {
        id: {
            type: Sequelize.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        createdBy:{
            type:Sequelize.STRING,
            field:'created_by'
        },
        title:{
            type:Sequelize.STRING
        },
        content:{
            type:Sequelize.JSON
        },
        label:{
            type:Sequelize.STRING,
            defaultValue:'general'
        },
        isDeleted:{
            type:Sequelize.TINYINT,
            defaultValue:0,
            field:'is_deleted'
        },
      createdAt: {
            type: Sequelize.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at',
        },
    },
    {tableName:'notes',
    timestamps: true,}
);

// Notes.associate = (models) => {
//     Notes.belongsTo(models.Users, { targetKey: 'id', foreignKey: 'created_by' });
// };

export default Notes;
