module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'Bronze',
          duration: 1,
          price: 70,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Silver',
          duration: 3,
          price: 60,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Gold',
          duration: 6,
          price: 50,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Diamond',
          duration: 12,
          price: 39.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
