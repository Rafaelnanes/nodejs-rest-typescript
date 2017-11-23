export default function (sequelize, DataTypes) {

    const Permission = sequelize.define('Permission', {
        id: {
            field: 'per_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: 'per_name',
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'PER_PERMISSION'
        }
    )
   
    return Permission;
}
