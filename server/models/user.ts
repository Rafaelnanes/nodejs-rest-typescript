export default function (sequelize, DataTypes) {

    const User = sequelize.define('user', {
        id: {
            field: 'usr_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            field: 'usr_login',
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            field: 'usr_password',
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
            tableName: 'USR_USER'
        }
    )

    User.belongsToMany(sequelize.models.permission, { as: 'usr_id', through: 'USP_USER_PERMISSION', foreignKey: 'usr_id', timestamps: false });
    sequelize.models.permission.belongsToMany(User, { as: 'per_id', through: 'USP_USER_PERMISSION', foreignKey: 'per_id', timestamps: false });

    return User;
}
