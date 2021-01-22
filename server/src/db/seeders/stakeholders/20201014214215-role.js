"use strict"

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
      "Roles",
      [
        {
          roleName: "stakeholder",
          createdAt,
          updatedAt,
        },
        {
          roleName: "user",
          createdAt,
          updatedAt,
        },
        {
          roleName: "staff",
          createdAt,
          updatedAt,
        },
        {
          roleName: "manager",
          createdAt,
          updatedAt,
        },
        {
          roleName: "admin",
          createdAt,
          updatedAt,
        },
        {
          roleName: "root",
          createdAt,
          updatedAt,
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
