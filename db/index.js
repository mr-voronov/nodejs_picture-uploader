const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs-1', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

const Images = require('./Images')(sequelize);

module.exports = {
    sequelize: sequelize,
    images: Images
}