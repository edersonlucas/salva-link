module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          username: 'teste',
          email: 'teste@teste.com',
          password:
            '$2y$10$Z2kC9BU1BpAypNl3B4bLa.oKHvTPiHa5jZAun6EI4eXIb0O6WK4U2',
          createdAt: '2023-02-11 21:22:21',
          updatedAt: '2023-02-11 21:22:21',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
