const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        modelName: 'post',
=======
        underscored: true,
        modelName: 'post'
>>>>>>> parent of 59560d9 (joins completed)
=======
        underscored: true,
        modelName: 'post'
>>>>>>> parent of 59560d9 (joins completed)
=======
        underscored: true,
        modelName: 'post'
>>>>>>> parent of 59560d9 (joins completed)
    }
);

module.exports = Post;