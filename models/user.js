const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    email:{
        type: Sequelize.STRING,
        unique: true
    },         
    password: Sequelize.STRING,
});

module.exports = User;