module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'links',
      [
        {
          id: 1,
          title: 'Trabalhando com arrays em Javascript',
          link: 'https://devgo.com.br/trabalhando-com-arrays-em-javascript',
          userId: 1,
          createdAt: '2020-10-29 21:22:21',
          updatedAt: '2020-10-29 21:22:22',
        },
        {
          id: 2,
          title:
            '10 extensões do Visual Studio Code para facilitar o seu dia a dia.',
          link: 'https://devgo.com.br/10-extensoes-do-visual-studio-code-para-facilitar-o-seu-dia-a-dia',
          userId: 1,
          createdAt: '2020-10-29 21:22:21',
          updatedAt: '2020-10-29 21:22:22',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('links', null, {});
  },
};
