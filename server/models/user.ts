export default function (sequelize, DataTypes) {

    const User = sequelize.define('User', {
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
        },
        profileId: {
            field: 'prf_id',
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'USR_USER',
            classMethods: {
                associate: function (models) {
                    User.belongsTo(models.Profile, { foreignKey: 'prf_id' });
                }
            }
        }
    )

    return User;
}
