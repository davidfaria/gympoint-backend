import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Student from '../src/app/models/Student';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  provider: false,
});

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number({ min: 16, max: 90 }),
  weight: faker.random.number({ min: 30, max: 200 }),
  feet_tall: parseFloat(faker.finance.amount(1, 2, 2)),
});

export default factory;
