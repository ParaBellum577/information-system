'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SecretCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.stakeholders.User, {
                    foreignKey: 'userId'
            })
        }
    };
    SecretCode.init({
        userId: {type: DataTypes.INTEGER},
        code: {type: DataTypes.STRING, allowNull: false}
    }, {
        sequelize,
        schema: 'public',
        modelName: 'SecretCode',
    });
    return SecretCode;
};