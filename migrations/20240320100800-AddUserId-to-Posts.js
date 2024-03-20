'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'UserId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: "id"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'UserId');
    /**
     * Add reverting commands here.
     *
     * Example:
     */
  }
};
