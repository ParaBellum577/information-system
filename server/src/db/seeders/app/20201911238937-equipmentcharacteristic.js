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
      'EquipmentCharacteristics',
      [
        {
          equipmentId: 1,
          characteristicName: 'Характеристика1',
          characteristicUnit: 'см',
          characteristicValue: '50',
        },
        {
          equipmentId: 1,
          characteristicName: 'Характеристика2',
          characteristicUnit: 'кг',
          characteristicValue: '20',
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
