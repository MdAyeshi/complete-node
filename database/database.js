const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Shahid@143', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;