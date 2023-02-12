module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'blogs',
      [
        {
          id: 1,
          name: 'Trybe',
          createdAt: '2020-10-29 21:22:21',
          updatedAt: '2020-10-29 21:22:22',
        },
        {
          id: 2,
          name: 'DevGO',
          createdAt: '2020-10-29 21:22:21',
          updatedAt: '2020-10-29 21:22:22',
        },
        {
          id: 3,
          name: 'TecnoBlog',
          createdAt: '2020-10-29 21:22:21',
          updatedAt: '2020-10-29 21:22:22',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('blogs', null, {});
  },
};
