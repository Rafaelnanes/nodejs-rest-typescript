export default function (sequelize, DataTypes) {

    const UserPermission = sequelize.define('UserPermission', {
        userId: {
            type: DataTypes.UUID,
            field: 'usr_id'
        },
        permissionId: {
            type: DataTypes.UUID,
            field: 'per_id'
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'USP_USER_PERMISSION',
            classMethods: {
                associate: function (models) {
                    UserPermission.belongsTo(models.Permission, { foreignKey: 'per_id' });
                    UserPermission.belongsTo(models.User, { foreignKey: 'usr_id' });
                    models.Permission.hasMany(UserPermission, { foreignKey: 'per_id', targetKey: 'per_id', 'as': 'PER_PERMISSION' });
                    models.User.hasOne(UserPermission, { foreignKey: 'usr_id', targetKey: 'usr_id', 'as': 'USR_USER' });
                }
            }
        }
    )

    return UserPermission;
}
