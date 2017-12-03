export default function (sequelize, DataTypes) {

    const Profile = sequelize.define('Profile', {
        id: {
            field: 'prf_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            field: 'prf_name',
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
            tableName: 'PRF_PROFILE'
        }
    )

    return Profile;
}
