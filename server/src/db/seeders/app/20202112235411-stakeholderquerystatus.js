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
      'StakeholderQueryStatuses',
      [
        {
          statusName: 'onCheck',
          createdAt,
          updatedAt
        },
        {
          statusName: 'accepted',
          createdAt,
          updatedAt
        },
        {
          statusName: 'rejected',
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
