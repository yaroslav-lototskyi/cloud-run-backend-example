/* eslint-disable import/no-commonjs */

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Talks', {
            id          : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            title       : { type: Sequelize.STRING, allowNull: false },
            posterUrl   : { type: Sequelize.STRING, defaultValue: ''  },
            description : { type: Sequelize.TEXT('long') },
            createdAt   : { type: Sequelize.DATE, allowNull: false },
            updatedAt   : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Talks');
    }
};
