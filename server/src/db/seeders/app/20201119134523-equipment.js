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
      'Equipment',
      [
        {
          equipmentName: 'Оборудование',
          equipmentPic: 'https://oz.com.ua/images/products/big/sigeta_edna.jpg',
          equipmentDescription: 'Описание оборудования',
          laboratoryId: '1',
          createdAt,
          updatedAt
        },
        {
          equipmentName: 'Оборудование2',
          equipmentPic: 'https://oz.com.ua/images/products/big/sigeta_edna.jpg',
          equipmentDescription: 'Описание оборудования2',
          laboratoryId: '1',
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
