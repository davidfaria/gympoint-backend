module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          id: 1,
          email: 'davidfaria89@gmail.com',
          name: 'David Faria',
          age: 30,
          feet_tall: 1.74,
          weight: 81,
          avatar_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          email: 'jcasilva86@gmail.com',
          name: 'Julio C. Antunes',
          age: 34,
          feet_tall: 1.68,
          weight: 85,
          avatar_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          email: 'paulomarcelo@gmail.com',
          name: 'Paulo Marcelo',
          age: 35,
          feet_tall: 1.77,
          weight: 84,
          avatar_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          email: 'welves@gmail.com',
          name: 'Welves Santos',
          age: 29,
          feet_tall: 1.8,
          weight: 96,
          avatar_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          email: 'fernando@gmail.com',
          name: 'Fernando',
          age: 40,
          feet_tall: 1.81,
          weight: 86,
          avatar_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
