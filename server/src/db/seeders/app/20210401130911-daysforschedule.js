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
      'DaysForSchedules',
      [
        {
          day: 'monday',
          createdAt,
          updatedAt
        },
        {
          day: 'tuesday',
          createdAt,
          updatedAt
        },
        {
          day: 'wednesday',
          createdAt,
          updatedAt
        },
        {
          day: 'thursday',
          createdAt,
          updatedAt
        },
        {
          day: 'friday',
          createdAt,
          updatedAt
        },
        {
          day: 'saturday',
          createdAt,
          updatedAt
        },
        {
          day: 'sunday',
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
