export default function (sequelize, DataTypes) {

    const ProfilePermission = sequelize.define('ProfilePermission', {
        profileId: {
            type: DataTypes.UUID,
            field: 'prf_id',
            allowNull: false
        },
        permissionId: {
            type: DataTypes.UUID,
            field: 'per_id',
            allowNull: false
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'PRP_PROFILE_PERMISSION',
            classMethods: {
                associate: function (models) {
                    ProfilePermission.belongsTo(models.Permission, { foreignKey: 'per_id', constraints: true });
                    ProfilePermission.belongsTo(models.Profile, { foreignKey: 'prf_id', constraints: true });
                    // models.Permission.hasMany(ProfilePermission, { foreignKey: 'per_id', targetKey: 'per_id', 'as': 'PER_PERMISSION' });
                    // models.Profile.hasMany(ProfilePermission, { foreignKey: 'prf_id', targetKey: 'prf_id', 'as': 'PRF_PROFILE' });
                }
            }
        }
    )

    return ProfilePermission;
}
