'use strict';

const createdAt = new Date()
const updatedAt = new Date()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      'ProjectStatuses',
      [
        {
          status: 'accepted',
          createdAt,
          updatedAt
        },
        {
          status: 'inProgress',
          createdAt,
          updatedAt
        },
        {
          status: 'finished',
          createdAt,
          updatedAt
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
