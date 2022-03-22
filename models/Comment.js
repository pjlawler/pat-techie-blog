const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            type: DataTypes.TEXT 
        },
        post_id: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
        }
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'comment'
=======
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
=======
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
>>>>>>> parent of 59560d9 (joins completed)
=======
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
>>>>>>> parent of 59560d9 (joins completed)
       sequelize,
       freezeTableName: true,
       underscored: true,
       modelName: 'comment'
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 59560d9 (joins completed)
=======
>>>>>>> parent of 59560d9 (joins completed)
=======
>>>>>>> parent of 59560d9 (joins completed)
    }
);

module.exports = Comment;