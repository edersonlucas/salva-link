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
            '$2y$10$goU.lSH8uA8CbRs.Ikiej.MOyUGtOE7aK6NXrcqiDpGiCAoLuVUcC',
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
