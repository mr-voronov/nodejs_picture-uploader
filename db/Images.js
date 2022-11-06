const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('images', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        image_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        file_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
}