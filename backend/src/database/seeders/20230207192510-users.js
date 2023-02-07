module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          username: 'edersonlucas',
          email: 'edersonlucas@outlook.com',
          password:
            '$2y$10$z7ToCdZ2KDmrqxf4auUPa.jCx2euQkfrld57l/6SU4vCS4GTSCO4C',
          createdAt: '2020-10-29 21:22:21',
          updatedAt: '2020-10-29 21:22:22',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
